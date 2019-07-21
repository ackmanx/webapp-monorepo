import React from 'react'
import './sidebar.css'
import {v4 as uuid} from 'uuid'
import {connect} from 'react-redux'
import {getCategories} from '../../actions/get-categories'
import {cancel_new_category, new_category_placeholder, show_category} from '../../actions/action-types'
import {submitNewCategory} from '../../actions/submit-new-category'

export class Sidebar extends React.Component {
    static defaultProps = {
        categories: {}
    }

    constructor(props) {
        super(props)
        this.submitNewCategory = this.submitNewCategory.bind(this)
        props.getCategories()
    }

    render() {
        const {
            categories,
            showCategory,
            currentCategoryId,
            addNewCategoryPlaceholder,
            showNewCategoryPlaceholder,
        } = this.props

        return (
            <div className='sidebar'>
                <div className='flex-container'>
                    <div className='category-action' onClick={addNewCategoryPlaceholder}>+</div>
                </div>
                <ul>
                    <li className={currentCategoryId === 'ALL' ? 'current-category' : ''}
                        onClick={() => showCategory('ALL')}>
                        All Categories
                    </li>
                    {showNewCategoryPlaceholder && (
                        <li>
                            <input autoFocus
                                   placeholder='new category name'
                                   onKeyDown={this.submitNewCategory}/>
                        </li>
                    )}
                    {Object.keys(categories).map(categoryId => (
                        <li key={uuid()}
                            className={currentCategoryId === categoryId ? 'current-category' : ''}
                            onClick={() => showCategory(categoryId)}>
                            {categories[categoryId].name}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    submitNewCategory(event) {
        if (event.key === 'Enter') {
            this.props.submitNewCategoryAction(event.target.value)
        }
        else if (event.key === 'Escape') {
            this.props.cancelNewCategory()
        }
    }
}

const mapStateToProps = state => ({
    categories: state.categories.data,
    showNewCategoryPlaceholder: state.categories.showNewCategoryPlaceholder,
    currentCategoryId: state.app.currentCategoryId,
})

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
    showCategory: categoryId => dispatch({type: show_category, categoryId}),
    addNewCategoryPlaceholder: () => dispatch({type: new_category_placeholder}),
    submitNewCategoryAction: name => dispatch(submitNewCategory(name)),
    cancelNewCategory: () => dispatch({type: cancel_new_category}),
})

export const ConnectedSidebar = connect(mapStateToProps, mapDispatchToProps)(Sidebar)

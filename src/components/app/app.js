import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list/post-list';
import PostAddForm from '../post-add-form';

import './app.css';
import styled from 'styled-components';

const AppBlock = styled.div`
    margin: 0 auto;
    max-width: 800px;
`;

// const StyledAppBlock = styled(AppBlock)`
// background-color: gray`;

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {label: "Going to learn React", important: true, like: false, id: 1},
                {label: "That is so good!", important: false, like: false, id: 2},
                {label: "I need a break...", important: false, like: false, id: 3},
            ],
            term: '',
            filter: 'all'
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onToggleImportant = this.onToggleImportant.bind(this);
        this.onToggleLike = this.onToggleLike.bind(this);
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onFilterSelect = this.onFilterSelect.bind(this);
        
        this.nextId = 4;
    }

    deleteItem(id) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const newArr = [...data.slice(0, index), ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    addItem(body) {
        const newItem = {
            label: body,
            important: false,
            id: this.nextId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleStatus(id, nameStatus) {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            const newItem = {...data[index]};
            newItem[nameStatus] = !data[index][nameStatus];
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return {
                data: newArr
            }
        })
    }

    onToggleImportant(id) {
        return this.onToggleStatus(id, "important");
    }

    onToggleLike(id) {
        return this.onToggleStatus(id, "like");
    }

    searchPost(items, term) {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.label.indexOf(term) > -1
        });
    }

    filterPost(items, filter) {
        if (filter === 'like') {
            return items.filter(item => item.like);
        } else {
            return items;
        }
    }

    onUpdateSearch(term) {
        this.setState({term});
    }

    onFilterSelect(filter) {
        this.setState({filter});
    }

    render() {
        const {data, term, filter} = this.state;
        const likedItems = data.filter(item => item.like).length;
        const allItems = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <AppBlock>
                <AppHeader 
                    likedItems={likedItems}
                    allItems={allItems}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdateSearch={this.onUpdateSearch} />
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect} />
                </div>
                <PostList
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleLike={this.onToggleLike} />
                <PostAddForm 
                    onAdd={this.addItem}/>
            </AppBlock>
        )
    }
}

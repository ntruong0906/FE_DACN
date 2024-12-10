import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userRedux: [],
            selectedRole: 'all',


        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }

    handleEditUser = (user) => {
        console.log('user edit: ', user)
        this.props.handleEditUserFromParent(user)
    }

    handleFilterChange = (e) => {
        this.setState({
          selectedRole: e.target.value,
        });
      }

    //Life cycle
    //Run Component: 1.Run constructor -> initstate 
    // 2. Did mount (set state)
    // 3. Render 
    render() {
        console.log('check all user:', this.props.listUsers)
        console.log('check state:', this.state.userRedux)
        // let arrUsers = this.state.userRedux
        // let arrUsers = this.state.userRedux.filter(user => user.roleId === 'R3');
        let arrUsers = this.state.userRedux;
        if (this.state.selectedRole !== 'all') {
            arrUsers = arrUsers.filter(user => user.roleId === this.state.selectedRole);
            
        }

        return (
            <>
                <div className="filter-container">
                    <label>Filter by Role: </label>
                    <select value={this.state.selectedRole} onChange={this.handleFilterChange}>
                        <option value="all">All</option>
                        <option value="R1">Admin</option>
                        <option value="R2">Bác sĩ</option>
                        <option value="R3">Bệnh nhân</option>
                    </select>
                </div>
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Phone number</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phonenumber}</td>
                                            <td>
                                                <button className='btn-edit'
                                                    onClick={() => this.handleEditUser(item)}
                                                ><i className="fas fa-pencil-alt"></i></button>

                                                <button className='btn-delete'
                                                    onClick={() => this.handleDeleteUser(item)}
                                                ><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.fetchDeleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);

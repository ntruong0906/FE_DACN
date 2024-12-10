import React, { Component } from 'react'; 
import { FormattedMessage } from 'react-intl'; // Thư viện hỗ trợ quốc tế hóa (không được sử dụng trong component này).
import { connect } from 'react-redux'; // Dùng để kết nối Redux store với component.
import './TableManageUser.scss'; // Import CSS để định dạng bảng.
import * as actions from '../../../store/actions'; // Import các action Redux để thực hiện các thao tác như fetch hoặc delete user.

// Markdown editor (không liên quan trực tiếp đến component này).
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(); // Khởi tạo Markdown parser.

function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text); // Hàm xử lý sự kiện thay đổi nội dung editor.
}

class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRedux: [], // Danh sách người dùng được lưu trữ từ Redux store.
            selectedRole: 'all', // Giá trị filter (lọc) role người dùng, mặc định là "all".
        };
    }

    componentDidMount() {
        // Gọi action Redux để lấy danh sách người dùng khi component được mount lên DOM.
        this.props.fetchUserRedux();
    }

    componentDidUpdate(prevProps, prevState) {
        // Kiểm tra nếu danh sách người dùng trong Redux store thay đổi, cập nhật state.
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                userRedux: this.props.listUsers,
            });
        }
    }

    handleDeleteUser = (user) => {
        // Hàm xử lý sự kiện xóa người dùng, gọi action Redux với `id` người dùng.
        this.props.deleteUserRedux(user.id);
    };

    handleEditUser = (user) => {
        // Hàm xử lý sự kiện chỉnh sửa người dùng, in thông tin user ra console.
        console.log('user edit: ', user);
        this.props.handleEditUserFromParent(user); // Gọi hàm từ parent component để thực hiện chỉnh sửa.
    };

    handleFilterChange = (e) => {
        // Hàm xử lý khi người dùng chọn filter theo vai trò (role).
        this.setState({
            selectedRole: e.target.value, // Cập nhật giá trị filter trong state.
        });
    };

    render() {
        console.log('check all user:', this.props.listUsers); // Log danh sách người dùng từ props.
        console.log('check state:', this.state.userRedux); // Log danh sách người dùng từ state.

        // Lọc danh sách người dùng theo role nếu giá trị filter không phải "all".
        let arrUsers = this.state.userRedux;
        if (this.state.selectedRole !== 'all') {
            arrUsers = arrUsers.filter(user => user.roleId === this.state.selectedRole);
        }

        return (
            <>
                {/* Dropdown filter để chọn vai trò người dùng */}
                <div className="filter-container">
                    <select value={this.state.selectedRole} onChange={this.handleFilterChange}>
                        <option value="all">All</option> {/* Hiển thị tất cả người dùng */}
                        <option value="R1">Admin</option> {/* Lọc theo Admin */}
                        <option value="R2">Bác sĩ</option> {/* Lọc theo Bác sĩ */}
                        <option value="R3">Bệnh nhân</option> {/* Lọc theo Bệnh nhân */}
                    </select>
                </div>

                {/* Bảng hiển thị danh sách người dùng */}
                <table id="TableManageUser">
                    <tbody>
                        <tr>
                            {/* Header của bảng */}
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Phone number</th>
                            <th>Actions</th>
                        </tr>
                        {/* Hiển thị danh sách người dùng */}
                        {arrUsers && arrUsers.length > 0 &&
                            arrUsers.map((item, index) => {
                                return (
                                    <>
                                        <tr key={index}>
                                            {/* Hiển thị thông tin người dùng */}
                                            <td>{item.email}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>{item.phonenumber}</td>
                                            <td>
                                                {/* Nút chỉnh sửa */}
                                                <button
                                                    className="btn-edit"
                                                    onClick={() => this.handleEditUser(item)}
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                {/* Nút xóa */}
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => this.handleDeleteUser(item)}
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </>
                                );
                            })
                        }
                    </tbody>
                </table>
            </>
        );
    }
}

// Kết nối Redux store và lấy danh sách người dùng từ state để truyền vào props.
const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users, // Danh sách người dùng từ `state.admin.users`.
    };
};

// Gắn các action Redux vào props để component có thể gọi.
const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()), // Action lấy danh sách người dùng.
        deleteUserRedux: (id) => dispatch(actions.fetchDeleteUser(id)), // Action xóa người dùng.
    };
};

// Kết nối component với Redux store và export.
export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);

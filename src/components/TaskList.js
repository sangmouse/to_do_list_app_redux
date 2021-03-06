import React,{Component} from 'react';
import TaskItem from './TaskItem';
// Không lấy state từ App nữa mà lên store để lấy, import connect từ react-redux để lấy state từ store

import {connect} from 'react-redux'

class TaskList extends Component {

    constructor(props){
        super(props);
        this.state = {
            filterName:'',
            filterStatus:-1
        };
    }

    onChange = (event) =>{
        var target=event.target
        var name=target.name
        var value=target.value
        this.props.onFilter(
            name ==='filterName'?value:this.state.filterName,
            name ==='filterStatus'?value:this.state.filterStatus
        )
        this.setState({
            [name]:value
        })
    }
    render() {
        
        var tasks=this.props.tasks
        var filterName=this.state.filterName
        var filterStatus=this.state.filterStatus

        var elementTask = tasks.map((task, index) => {
            return <TaskItem
                key={task.id}
                index={index}
                task={task}
                onUpdateStatus={this.props.onUpdateStatus}
                onDeleteItem={this.props.onDeleteItem}
                onReceiveEvent={this.props.onReceiveEvent}
                onUpdate={this.props.onUpdate}
            ></TaskItem>
        })
        return (
            <div className="row mt-15">
                <div className="col-12">
                    <table className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>
                                    <input 
                                    type="text" 
                                    className="form-control"
                                    name="filterName" 
                                    value={filterName}
                                    onChange={this.onChange}
                                
                                    />
                                </td>
                                <td>
                                    <select 
                                    className="form-control"
                                    name="filterStatus"
                                    value={filterStatus}
                                    onChange={this.onChange}
                                    >
                                        <option value="-1">Tất Cả</option>
                                        <option value="0">Ẩn</option>
                                        <option value="1">Kích Hoạt</option>
                                    </select>
                                </td>
                                <td></td>
                            </tr>
                            {elementTask}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    } 
}
// chuyển tất cả State từ store (task.js) thành props trong component
const mapStateToProps = (state) =>{
    return {
        tasks: state.tasks
    }
}


export default connect(mapStateToProps, null)(TaskList) 
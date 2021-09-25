// import * as React from "react";
// import * as ReactDOM from "react-dom";
import * as React from "react";
import * as ReactDOM from "react-dom";

class DesckBoardReact extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            task: [],
            owner: '',
            title: '',
            description: ''
        }
    }
    close = () => {
        let modal: any = document.getElementById("openModal");
        modal.classList.remove("open_modal");
    }
    componentDidMount() {
        this.setState({ task: [] });
    }
    rendertask() {
        return this.state.task.map(elem => {

            return <div className="task">
                <div className="task__info">
                    <span className="modal-content__owner">Кому - {elem.owner}</span>
                    <span className="modal-content__title">Название -{elem.title}</span>
                    <input type="button" value="x" />
                </div>
                <span>Описание</span>
                <p className="task__description">

                    {elem.description}
                </p>

            </div>
        })
    }
    addTask = () => {
        let task = this.state.task;
        task.push({ title: this.state.title, description: this.state.description, owner: this.state.owner });
        this.setState({
            task: task,
            owner: '',
            title: '',
            description: ''
        });
    }
    changeOwner = (ev) => {
        this.setState({
            owner: ev.target.value
        });
    }
    changeTitle = (ev) => {
        this.setState({
            title: ev.target.value
        });
    }
    changeDescription = (ev) => {
        this.setState({
            description: ev.target.value
        });
    }
    renderInterface() {
        return <div className="interface">
            <div className="interface__taskInfo">
                <label>Предать задачу: <input type="text" onChange={this.changeOwner} className="interface__owner" /></label>
                <label>название задачи: <input type="text" onChange={this.changeTitle} className="interface__owner" /></label>

            </div>
            <label  >
                Описание  задачи
                <textarea className="interface__description" onChange={this.changeDescription} id="" ></textarea>
            </label>

            <input type="button" onClick={this.addTask} value="Добавить задачу" />
        </div>
    }
    render() {
        return <div className="modal-content">
            <h3>Задачи</h3>
            <input type="button" className="modal-content__cancel" onClick={this.close} value="x" />
            <div className="modal-content__task-container">{this.rendertask()}</div>
            <div className={"modal-content__interactive"}>
                {this.renderInterface()}
            </div>
        </div>;
    }
}

export class DesckBoard {
    data: any;
    constructor(props) {

        this.init();
    }
    init() {
        console.log("desck");
        let modal: any = document.getElementById("openModal");
        modal.classList.add("open_modal");
        let modal_content = document.getElementById("modal-content-id");
        // let close_modal = document.getElementById(close_modal);
        // запрос на данные
        ReactDOM.render(<DesckBoardReact />, modal_content);
    }
}

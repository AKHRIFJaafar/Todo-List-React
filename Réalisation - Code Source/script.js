// return (
//   <div className="container">
//     <div className="row">
//       <div className="col-sm-6 col-sm-offset-3 m-auto">
//         <h1> Tâches à faire</h1>
//         <form
//           id="form-add"
//           className="form-horizontal">
//           <div className="input-group w-100">
//             <input type="text" className="form-control" placeholder="Description de la tâche..." aria-label="Input group example" aria-describedby="basic-addon1"/>
//               <button className="btn btn-default">                 
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
//                 <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
//                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
//               </svg>
//             </button>
// </div>
//         </form>
// Composant : Tâche
class Task extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    let class_name = 'task'
    class_name += this.props.done ? ' task-success' : ' task-info';
  
    return (
      <div className={class_name} onClick={this.props.onClickTask}>
        <span>{this.props.value}</span>
        <i className="close" onClick={this.props.onClickClose}>&times;</i>
      </div>
    )
  }
}

// Application
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tasksArray: [
        {value: 'To do list', done: true},
        {value: 'Site E-comerce Wordpress', done: false},
        {value: 'Site Ville Wordpress', done: false}
      ],
      value: ''
    }
  }

  addTask(e) {
    
    
     if (addInput.value.length != 0) {
      this.state.tasksArray.push({
        value: addInput.value,
        done: false
      })
      
      
      this.setState(state => ({
        tasksArray: state.tasksArray
      }));

    }

    e.preventDefault()
  }

  removeTask(i) {
    this.state.tasksArray.splice(i, 1)
    this.setState({
      tasksArray: this.state.tasksArray
    })
  }

  markDone(i) {
    let tasksArray = this.state.tasksArray
    let task = this.state.tasksArray[i]
    tasksArray.splice(i, 1)
    task.done = !task.done 
    
    task.done ? tasksArray.push(task) : tasksArray.unshift(task)


    this.setState({
      tasksArray: tasksArray
    })

    
  }

  onChangeInput(e) {
    // this.setState({value: e.target.value})
  }

  render() {
    let tasksArray = this.state.tasksArray.map((task, i) => {
      return (
        <Task 
          key={i}
          value={task.value}
          done={task.done}
          onClickClose={this.removeTask.bind(this, i)}
          onClickTask={this.markDone.bind(this, i)}
        />
      )
    })

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 m-auto">
            <h1> Todo List !!</h1>
            <form
              id="form-add"
              className="form-horizontal"
              onSubmit={this.addTask.bind(this)}>
              <div className="input-group w-100">
                <input type="text" id="addInput" className="form-control" onChange={this.onChangeInput.bind(this)} placeholder="Description de la tâche..." />
                <div className="input-group-btn">
                  <button type="submit" className="btn btn-default">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="38" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
              </svg>
                  </button>
                </div>
              </div>
            </form>

            {tasksArray}
            
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
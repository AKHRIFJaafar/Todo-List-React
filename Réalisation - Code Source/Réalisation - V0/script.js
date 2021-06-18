// Composant : Tâche
class Task extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let class_name = 'task'
    class_name += this.props.done ? ' task-success' : ' task-info';

    return (
      <div className={class_name} id={this.props.id}>
        <span>{this.props.value}</span>
        <i className="close">&times;</i>
      </div>
    )
  }
}

// Application
class App extends React.Component {

  tasksArray = [
    { value: 'Tâche 1', done: true },
    { value: 'Tâche 2', done: false },
    { value: 'Tâche 3', done: true }
  ];

  constructor(props) {
    super(props)
  }

  render() {

    let tasksArrayMap = this.tasksArray.map((task, i) => {
      return (
        <Task
          id={i}
          value={task.value}
          done={task.done}
        />
      )
    })

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-sm-offset-3 m-auto">
            <h1> Tâches à faire</h1>
            <form
              id="form-add"
              className="form-horizontal">
              <div className="input-group w-100">
                <input type="text" class="form-control" placeholder="Description de la tâche..." aria-label="Input group example" aria-describedby="basic-addon1"/>
                  <button className="btn btn-primary">                 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                  </svg>
                </button>

</div>
            </form>

              {tasksArrayMap}

            </div>
          </div>
        </div>
        )
  }
}

        ReactDOM.render(<App />, document.getElementById('app'));
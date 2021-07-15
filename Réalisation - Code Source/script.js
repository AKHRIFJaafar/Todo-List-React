// Composant : Tâche
class Task extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let class_name = 'task'
    class_name += this.props.done == 1 ? ' task-success' : ' task-info';

    return (
      <div className={class_name} onClick={this.props.onClickTask}>
        <span>{this.props.value}</span>
        <i className="close" onClick={this.props.onClickClose}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
        </svg></i>
      </div>

    )
  }
}

// Application
class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tasksArray: []
    };
  }
  componentDidMount() {
    this.chargementDonnees();
  }
  chargementDonnees() {

    var tasksArray = null;

    // affichage de données par Ajax

    $.getJSON("api/getTasks.php",
      function (data) {
        this.setState({ tasksArray: data });
      }.bind(this))
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.log(errorThrown);
      });
  }
  //add Task
  addTask(e) {
    $.ajax({
      url: "/api/addTask.php",
      method: "POST",
      data: {
        task_name: addInput.value,
      },
      success: function (data) {
        this.chargementDonnees()
        console.log(data)
      }.bind(this)
    })
    e.preventDefault();
  }
  // Remove Task
  removeTask(i) {
    $.ajax({
      url: "/api/deleteTask.php",
      method: "POST",
      data: {
        id: i
      },
      success: function (data) {
        $(this).parent().remove();
        this.chargementDonnees()
      }.bind(this)
    })

  }

  markDone(i, status) {
    if (status != 1) {
      $.ajax({
        url: "api/state.php",
        method: "POST",
        data: {
          sid: i,
          task_state: 1
        },
        success: function (data) {
          this.chargementDonnees()
          console.log(data)
        }.bind(this)
      })
    } else {
      $.ajax({
        url: "api/state.php",
        method: "POST",
        data: {
          sid: i,
          task_state: 0
        },
        success: function (data) {
          this.chargementDonnees()
          console.log(data)
        }.bind(this)
      })
    }
  }

  onChangeInput(e) {
    // this.setState({value: e.target.value})
  }

  render() {
    let tasksArray = this.state.tasksArray.map((task) => {
      return (
        <Task
          key={task.idtasks}
          value={task.task_name}
          done={task.task_state}
          onClickClose={this.removeTask.bind(this, task.idtasks)}
          onClickTask={this.markDone.bind(this, task.idtasks, task.task_state)}
        />
      )
    })

    return (
      <div className="container">

        <div className="card-header ui-sortable-handle">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor "height="30" width="30" className="bi bi-list-stars" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5z"></path>
  <path d="M2.242 2.194a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.256-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53zm0 4a.27.27 0 0 1 .516 0l.162.53c.035.115.14.194.258.194h.551c.259 0 .37.333.164.493l-.468.363a.277.277 0 0 0-.094.3l.173.569c.078.255-.213.462-.423.3l-.417-.324a.267.267 0 0 0-.328 0l-.417.323c-.21.163-.5-.043-.423-.299l.173-.57a.277.277 0 0 0-.094-.299l-.468-.363c-.206-.16-.095-.493.164-.493h.55a.271.271 0 0 0 .259-.194l.162-.53z"></path>
</svg>
 <h1 className="">Todo List</h1>
              </div>
              <form
            id="form-add"
            className="form-horizontal"
            onSubmit={this.addTask.bind(this)}>
            <div className="input-group">
              <input type="text" id="addInput" className="form-control" onChange={this.onChangeInput.bind(this)} placeholder="Description de la tâche..." />
              <div className="input-group-btn">
                <button type="submit" className="btn btn-default">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="38" fill="currentColor" className="bi bi-plus-square text-right" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </form>

          <div className="row">
            {tasksArray}
          </div>

        </div>
            )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
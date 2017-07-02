
//------- ACTIONS -------
const ADD_CLIENT = 'ADD_CLIENT';          // when CLIENT connects to room
const REMOVE_CLIENT = 'REMOVE_CLIENT';    // when CLIENT disconnects from room
const LOAD_CLIENTS = 'LOAD_CLIENTS';      // initial load of all CLIENTs
const UPDATE_CLIENT = 'UPDATE_CLIENT';    // update a CLIENT during game
const UPDATE_CLIENTS = 'UPDATE_CLIENTS';  

// ------ ACTION CREATORS -------

const addClient = client => ({ type: ADD_CLIENT, client });
const removeClient = (client) => ({ type: REMOVE_CLIENT, client });
const loadClients = () => ({ type: LOAD_CLIENTS });
const updateClient = client => ({ type: UPDATE_CLIENT, client});
const updateClients = clients => ({ type: UPDATE_CLIENTS, clients});


// ------- INIT STATE --------
const initialState = {
  clients: []
}


// ------- REDUCERS ------------
module.exports = function (state = initialState, action) {
  const newState = Object.assign({}, state );

  switch (action.type) {

    case ADD_CLIENT:
      const clientsArrCopy = newState.clients.slice(0)
      clientsArrCopy.push(action.client);
      newState.clients = clientsArrCopy
      break;

    case REMOVE_CLIENT:
      const clientRemovedArr = newState.clients.filter(client => client.id !== action.client.id)
      newState.clients = clientRemovedArr
      break;

    case UPDATE_CLIENT:
      const clientUpdatedArr = newState.clients
        .slice(0)
        .splice(
          newState.clients.findIndex(client => client.id === action.client.id),
          1, action.client
        )
      newState.clients = clientUpdatedArr
      break;

    case UPDATE_CLIENTS:
      const newClientsArr = action.clients
      newState.clients = newClientsArr;
      break;

    default:
      return newState;
  }
  return newState
}


// -------- DISPATCHERS -----------

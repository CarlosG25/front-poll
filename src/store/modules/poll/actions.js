import { GET_ALL_BY_USER, GET_ALL } from './mutation-type';
import HTTP from './../../api/http-common';

export const getAllPolls = ({ commit }) => {
  getAllPollsAction()
    .then(data => {
      commit(GET_ALL, data);
    })
    .catch(err => {
      if (err === undefined) {
        err = 'Ocurrio un error al obtener las encuestas';
      }
      window.getApp.snackbar = {
        show: true,
        color: 'error',
        text: err,
        position: 'top'
      };
    });
};

export const savePoll = ({ commit }, body) => {
  let data = {
    namePoll: body.name,
    descriptionPoll: body.description,
    idUser: body.idUser,
    answers: body.answers
  };

  savePollAction(data)
    .then(data => {
    })
    .catch(err => {
      if (err === undefined) {
        err = 'Ocurrio un error al guardar la encuesta';
      }
      window.getApp.snackbar = {
        show: true,
        color: 'error',
        text: err,
        position: 'top'
      };
    });
};

export const saveVote = ({ commit }, body) => {

  let data = {
    idAnswer: body.idAnswer,
    idUser: body.idUser
  };

  HTTP.post('vote-users', data)
    .then(function (response) {
    }).catch(function (error) {
      console.log(error);
    });
};

export const getPollsForUser = ({ commit }) => {
  HTTP.get('polls')
    .then(function (response) {
      commit(GET_ALL_BY_USER, response.data);
    }).catch(function (error) {
      console.log(error);
    });
};

function getAllPollsAction () {
  return new Promise((resolve, reject) => {
    HTTP.get('polls')
      .then(response => {
        return resolve(response.data);
      })
      .catch(err => {
        return reject(err.response.data.message);
      });
  });
}

function savePollAction (body) {
  return new Promise((resolve, reject) => {
    HTTP.post('polls', body)
      .then(response => {
        return resolve(response.data);
      })
      .catch(err => {
        return reject(err.response.data.message);
      });
  });
}
import { nanoid } from 'nanoid'

export const state = () => ({
   players: []
})

export const mutations = {
   SET_PLAYERS(state, players) {
      state.players = players
   },
   ADD_PLAYER(state, player) {
      state.players.push(player)
   },
   DELETE_PLAYER(state, id) {
      const index = state.players.findIndex(player => player.id === id)
      if (index !== -1) {
         state.players.splice(index, 1)
      }
   },
   EDIT_PLAYER_NAME(state, { id, newName }) {
      const index = state.players.findIndex(player => player.id === id)
      if (index !== -1) {
         state.players[index].playerName = newName
      }
   }
}

export const actions = {
   addPlayer({ commit, state }, playerName) {
      const player = {
         id: nanoid(),
         playerName,
         highScore: 0,
         totalScore: 0,
         totalGameTime: 0,
         totalGamesPlayed: 0,
         accuracy: 0
      }
      commit('ADD_PLAYER', player)
      localStorage.setItem('players', JSON.stringify(state.players))
   },
   deletePlayer({ commit }, id) {
      commit('DELETE_PLAYER', id)
      localStorage.setItem('players', JSON.stringify(state.players))
   },
   editPlayerName({ commit }, { id, newName }) {
      commit('EDIT_PLAYER_NAME', { id, newName })
      localStorage.setItem('players', JSON.stringify(state.players))
   },
   fetchPlayers({ commit }) {
      const players = JSON.parse(localStorage.getItem('players') || '[]')
      commit('SET_PLAYERS', players)
   }
}

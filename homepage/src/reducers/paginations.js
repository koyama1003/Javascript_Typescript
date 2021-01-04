import { PAGINATION } from '../actions'
const paginations = (state = 1, action) => {
    switch (action.type) {
        case PAGINATION:
            return action.page
        default: return 1
    }
}
export default paginations
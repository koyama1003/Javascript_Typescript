import { NAVIGATION } from '../actions'
const navigations = (state = 0, action) => {
    switch (action.type) {
        case NAVIGATION:
            return action.nav
        default: return 0
    }
}
export default navigations
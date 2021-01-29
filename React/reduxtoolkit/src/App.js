import { useSelector, useDispatch } from "react-redux";
import { setName } from "./stores/user";

const App = () => {
  const name = useSelector((state) => state.user.name);
  const dispatch = useDispatch();
  return (
    <div>
      <p>{name}</p>
      <button onClick={() => dispatch(setName("aaacd"))}>dispatch</button>
    </div>
  );
};

export default App;

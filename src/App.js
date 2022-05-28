import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { calculatTotals, getCartItems } from './features/cart/cartSlice'

import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from './components/Modal'
function App() {
  const { cartItems , isLoading} = useSelector(store => store.cart)
  const {isOpen} = useSelector(store => store.modal)
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getCartItems())
  },[])
  useEffect(() => {
    dispatch(calculatTotals())
  }, [cartItems, dispatch])
  if (isLoading) {
    return <div className="loading">
      <h1>Loading...</h1>
    </div>
  }
  return <main>
    <Navbar />
    {isOpen && <Modal/>}
    <CartContainer />
  </main>
}
export default App;

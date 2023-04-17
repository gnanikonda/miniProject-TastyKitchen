import {Component} from 'react'

import './index.css'

const localStorageData = () => {
  const newCartList = JSON.parse(localStorage.getItem('Cart_Items'))
  if (newCartList === null) {
    return []
  }
  return newCartList
}

class Counter extends Component {
  state = {
    itemsList: localStorageData(),
    count: 0,
  }

  local = () => {
    const {itemsList} = this.state
    // console.log(itemsList)
    localStorage.setItem('Cart_Items', JSON.stringify(itemsList))
  }

  setItemsToLocal = () => {
    const {count, itemsList} = this.state
    // const itemsList = JSON.parse(localStorage.getItem('Cart_Items')) || []
    const {itemDetails} = this.props

    const addQualtity = {...itemDetails, quantity: count}
    // console.log(addQualtity)

    const productObject = itemsList.find(
      eachCartItem => eachCartItem.id === itemDetails.id,
    )

    if (productObject !== undefined) {
      // console.log(itemsList)
      this.setState(
        prevState => ({
          itemsList: prevState.itemsList.map(eachCartItem1 => {
            if (itemDetails.id === eachCartItem1.id) {
              const updatedQuantity = eachCartItem1.quantity + 1

              return {...eachCartItem1, quantity: updatedQuantity}
            }
            return eachCartItem1
          }),
        }),
        this.local,
      )
    } else {
      const updatedCartList = [...itemsList, addQualtity]
      // console.log('form else')

      this.setState({itemsList: updatedCartList}, this.local)
    }
  }

  onDecrement = () => {
    const {count} = this.state
    if (count > 0) {
      this.setState(prevState => ({count: prevState.count - 1}))
    } else {
      this.setState(prevState => ({count: 0}))
    }
  }

  onIncrement = () => {
    this.setState(a => ({count: a.count + 1}), this.setItemsToLocal)
  }

  render() {
    const {count} = this.state

    return (
      <div className="counter-div">
        <button
          type="button"
          onClick={this.onDecrement}
          className="counter-btn"
        >
          -
        </button>
        <div className="count-div">{count}</div>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
      </div>
    )
  }
}

export default Counter

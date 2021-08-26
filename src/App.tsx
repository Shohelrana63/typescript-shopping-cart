import { useState } from 'react';
import { useQuery } from 'react-query';
// Components
import Drawer from '@material-ui/core/Drawer';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import Item from './Item/Item';
import Cart from './Cart/Cart';
// Styles
import { Wrapper, StyledButton } from './App.styles';
//types
export type CartItemType = {
  id: number,
  category: string,
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
}
const getProducts = async (): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products/')).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  )
  console.log('data', data);
  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems(prev => {
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading)
    return <div style={{ textAlign: 'center', marginTop: '250px' }}>
      <CircularProgress color="secondary" />
    </div>
  if (error) return <div>Something Went Wrong ...!</div>

  return (
    <div>
      <h1>Shopping cart</h1>
      <Wrapper>
        <Drawer anchor='right'
          open={cartOpen}
          onClose={() => setCartOpen(false)} >
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
        <StyledButton onClick={() => setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
            <AddShoppingCartIcon color="secondary" />
          </Badge>
        </StyledButton>
        <Grid container spacing={3} >
          {data?.map(item => (
            <Grid item key={item.id} xs={12} sm={4}>
              <Item item={item} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      </Wrapper>
    </div>
  );
}

export default App;

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

  const handleAddToCart = (clickedItem: CartItemType) => null;

  const handleRemoveFromCart = () => null;

  if (isLoading)
    return <div style={{ textAlign: 'center', marginTop: '300px' }}>
      <CircularProgress color="secondary" />
    </div>
  if (error) return <div>Something Went Wrong ...!</div>
  return (
    <div style={{ background: "#1d1d1d" }}>
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
            <AddShoppingCartIcon color='primary' />
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

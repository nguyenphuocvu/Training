const product = [
   { title: 'Cabbage', id: 1 },
   { title: 'Garlic', id: 2 },
   { title: 'Apple', id: 3 },
];

export default function MyComponent() {
   const listItems = product.map(product => {
      return (
         <li key={product.id}>
            {product.title}
         </li>
      );
   });

   return (
      <ul>
         {listItems}
      </ul>
   );
}

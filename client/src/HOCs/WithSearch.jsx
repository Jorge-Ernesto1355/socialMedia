
// eslint-disable-next-line react/display-name
const WithSearch = (Component) =>  (props) => {

    console.log(props)
  

    return (
        <Component {...props}/>
    )
}

export default WithSearch
import Typography from "antd/es/typography/Typography";
const {Text} = Typography

const ErrorMessageText = ({ error }) => {
    
    if (!error) return null;
  
    let errorMessage = 'An error occurred. Please try again.';
    if (error.response && error.response.data && error.response.data.error) {
      errorMessage = error.response.data.error;
    }
  
    return (
      <Text
        type='danger'
        style={{ marginBottom: '1rem' }}
      >
        {errorMessage}
      </Text>
    );
  };

  export default ErrorMessageText
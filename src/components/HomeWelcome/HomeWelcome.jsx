import { ButtonContainer, Container } from "./HomeWelcome.styled";
import HomeImage from "./gold_1.png";
const HomeWelcome = () => {
  return (
    <>
      <Container>
        <img
          src={HomeImage}
          alt="General photo with gold jewelry"
          width={460}
          height={310}
        />
        <ButtonContainer>
          {/* <SignIn to="/auth/login" as={RouterLink}>
            Log In
          </SignIn>
          <Register to="/auth/register/user" as={RouterLink}>
            Register
          </Register> */}
        </ButtonContainer>
      </Container>
    </>
  );
};
export default HomeWelcome;

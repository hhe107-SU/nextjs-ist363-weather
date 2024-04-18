import Row from "./Row";

import styles from "./Header.module.scss";
import Container from "./Container";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
      <Row justifyContent="space-between"> Logo and nav

      </Row>
      </Container>
    </header>
  );
};
export default Header;
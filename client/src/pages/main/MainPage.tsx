import { Button, Typography } from 'antd';
import styles from './MainPage.module.scss';

export const MainPage = () => {
  const { Title } = Typography;
  return (
    <main className={styles.main}>
      <Title className={styles.title}>СВОЯ ИГРА</Title>
      <Button>Войти как ведущий</Button>
      <Button>Войти как игрок</Button>
    </main>
  );
};

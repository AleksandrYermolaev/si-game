import { Button, Input, Modal, Typography } from 'antd';
import styles from './MainPage.module.scss';
import { useState } from 'react';
import { presenterApi } from '../../api';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../providers';

export const MainPage = () => {
  const [openPresenterModal, setOpenPresenterModal] = useState<boolean>(false);
  const [openPlayerModal, setOpenPlayerModal] = useState<boolean>(false);
  const [playerName, setPlayerName] = useState<string>('');

  const navigate = useNavigate();
  const { presenter } = useData();

  const { Title } = Typography;

  const handleOpenPresenterModal = () => {
    setOpenPresenterModal(true);
  };

  const handleClosePresenterModal = () => {
    setOpenPresenterModal(false);
  };

  const handleOpenPlayerModal = () => {
    setOpenPlayerModal(true);
  };

  const handleClosePlayerModal = () => {
    setOpenPlayerModal(false);
    setPlayerName('');
  };

  const handleSetPresenter = async () => {
    try {
      await presenterApi.set();
      navigate('/presenter');
    } catch (error) {
      console.error(error);
      handleClosePresenterModal();
    }
  };

  const handleSetPlayer = async () => {
    if (playerName.length === 0) {
      return;
    }

    try {
      navigate('/player', { state: { name: playerName } });
    } catch (error) {
      console.error(error);
      handleClosePlayerModal();
    }
  };

  return (
    <main className={styles.main}>
      <Title className={styles.title}>СВОЯ ИГРА</Title>

      <Button
        className={styles.button}
        type="primary"
        onClick={handleOpenPresenterModal}
        disabled={presenter}
      >
        Войти как ведущий
      </Button>

      <Button className={styles.button} onClick={handleOpenPlayerModal}>
        Войти как игрок
      </Button>

      <Modal
        title="Уверен?"
        open={openPresenterModal}
        onCancel={handleClosePresenterModal}
        footer={[
          <Button key="back" onClick={handleClosePresenterModal}>
            Не
          </Button>,
          <Button key="submit" type="primary" onClick={handleSetPresenter}>
            Я - Ведущий!
          </Button>,
        ]}
      >
        <p>Точно будешь ведущим, или выёбываешься?</p>
      </Modal>

      <Modal
        title="Введите имя"
        open={openPlayerModal}
        onCancel={handleClosePlayerModal}
        footer={[
          <Button key="back" onClick={handleClosePlayerModal}>
            Отмена
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSetPlayer}
            disabled={playerName.length === 0}
          >
            В игру
          </Button>,
        ]}
      >
        <Input value={playerName} onChange={(event) => setPlayerName(event.target.value)} />
      </Modal>
    </main>
  );
};

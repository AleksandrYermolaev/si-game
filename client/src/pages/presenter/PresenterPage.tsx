import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, List, Modal, Typography } from 'antd';
import { Player } from '../../types';
import { playerApi } from '../../api/player';
import { presenterApi } from '../../api/presenter';
import styles from './PresenterPage.module.scss';
import { useData } from '../../providers';

export const PresenterPage = () => {
  const [openExitModal, setOpenExitModal] = useState<boolean>(false);
  const { connectedPlayers, respondent, wrongPlayers } = useData();

  const navigate = useNavigate();

  const { Title } = Typography;

  const handleExit = async () => {
    try {
      await presenterApi.remove();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenExitModal = () => {
    setOpenExitModal(true);
  };

  const handleCloseExitModal = () => {
    setOpenExitModal(false);
  };

  const handleWrongAnswer = async () => {
    if (respondent) {
      try {
        await playerApi.setWrong(respondent);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCorrectAnswer = async () => {
    if (respondent) {
      try {
        await playerApi.clearWrongs();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleResetAnswers = async () => {
    try {
      await playerApi.clearWrongs();
    } catch (error) {
      console.error(error);
    }
  };

  const isPlayerWrong = (name: string) =>
    wrongPlayers.some((wrongPlayer) => wrongPlayer.name === name);

  const dataSource = connectedPlayers.length === 0 ? [{ name: 'Никого нет' }] : connectedPlayers;
  const renderList = (player: Player) => {
    if (connectedPlayers.length === 0) {
      return <List.Item className={styles.noBody}>{player.name}</List.Item>;
    }
    return (
      <List.Item className={isPlayerWrong(player.name) ? styles.error : undefined}>
        {player.name}
      </List.Item>
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <List
          header={
            <Title level={4} className={styles.title}>
              Список игроков
            </Title>
          }
          size="small"
          dataSource={dataSource}
          renderItem={renderList}
        />
        <Button type="primary" className={styles.closeButton} onClick={handleOpenExitModal}>
          Завершить и выйти
        </Button>
      </div>

      {respondent && (
        <>
          <p className={styles.respondent}>
            Отвечает: <span className={styles.accent}>{respondent.name}</span>
          </p>
          <Flex vertical gap={40} className={styles.controlsBlock}>
            <Button className={styles.controls} onClick={handleWrongAnswer}>
              Неверно
            </Button>
            <Button type="primary" className={styles.controls} onClick={handleCorrectAnswer}>
              Ответ правильный!
            </Button>
          </Flex>
          <div className={styles.bottom}>
            <Button type="dashed" className={styles.controls} onClick={handleResetAnswers}>
              Сброс ответа
            </Button>
          </div>
        </>
      )}

      {!respondent && connectedPlayers.length > 0 && wrongPlayers.length > 0 && (
        <>
          <p className={styles.respondent}>Ждем еще ответов...</p>
          <div className={styles.bottom}>
            <Button type="dashed" className={styles.controls} onClick={handleResetAnswers}>
              Сброс ответа
            </Button>
          </div>
        </>
      )}

      {!respondent && connectedPlayers.length > 0 && wrongPlayers.length === 0 && (
        <p className={styles.respondent}>Смотрю, кто самая быстрая рука...</p>
      )}

      <Modal
        title="Уверен?"
        open={openExitModal}
        onCancel={handleCloseExitModal}
        footer={[
          <Button key="back" onClick={handleCloseExitModal}>
            Не
          </Button>,
          <Button key="submit" type="primary" onClick={handleExit}>
            Выходим
          </Button>,
        ]}
      >
        <p>Покинуть игру и распустить игроков?</p>
      </Modal>
    </main>
  );
};

import { Typography } from 'antd';
import styles from './PlayerPage.module.scss';
import { useEffect } from 'react';
import { socket } from '../../webSocket';
import { useLocation, useNavigate } from 'react-router-dom';
import { useData } from '../../providers';

export const PlayerPage = () => {
  const { Title } = Typography;
  const location = useLocation();
  const navigate = useNavigate();
  const { respondent, wrongPlayers } = useData();

  const playerName = location.state?.name || 'Ошибка в имени';
  const playerWrong = wrongPlayers.some((wrongPlayer) => wrongPlayer.name === playerName);

  useEffect(() => {
    const navigateToMain = () => navigate('/');

    socket.emit('add-player', { name: playerName });
    socket.on('kick-players', navigateToMain);

    return () => {
      socket.emit('remove-player', { name: playerName });
      socket.off('kick-players', navigateToMain);
    };
  }, [playerName, navigate]);

  const handleAnswer = () => {
    socket.emit('answer', { name: playerName });
  };

  const showAnswerReceiving = !respondent;
  const showPlayerAnswerWrong = !respondent && playerWrong;
  const showPlayerAnswering = !!respondent && respondent.name === playerName;
  const showAnotherAnswering = !!respondent && respondent.name !== playerName;
  const disableAnswerButton = !!respondent || playerWrong;

  return (
    <main className={styles.main}>
      <Title level={3} className={styles.text}>
        {playerName}
      </Title>

      {showAnswerReceiving && (
        <div className={styles.mainTextContainer}>
          <Title level={4} className={styles.text}>
            Идет приём ответов...
          </Title>
          {showPlayerAnswerWrong && (
            <Title level={4} className={styles.textError}>
              Вы ответили не правильно
            </Title>
          )}
        </div>
      )}

      {showPlayerAnswering && (
        <Title level={4} className={styles.text}>
          Вы отвечаете!
        </Title>
      )}

      {showAnotherAnswering && (
        <Title level={4} className={styles.text}>
          {respondent.name} отвечает
        </Title>
      )}

      <button className={styles.replyButton} onClick={handleAnswer} disabled={disableAnswerButton}>
        {disableAnswerButton ? 'нет кнопки' : 'кнопка'}
      </button>
    </main>
  );
};

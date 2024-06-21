import { Col, Empty, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import './conversationPage.css';
import WithSearch from '../../HOCs/WithSearch';
import ConversationView from '../../components/RIGHT/Messages/conversationView/ConversationView';
import { useSocket } from '../../hooks/useSocket';
import EmptyConversation from './EmptyConversation/EmptyConversation';
import BoxMessage from '../../components/RIGHT/Messages/MessageBox/BoxMessage';
import InformationUser from './InformationUser/InformationUser';
import AuthProvider from '../../zustand/AuthProvider';
import { useMediaQuery } from 'react-responsive';

const ConversationsPage = () => {
  const { userId } = AuthProvider();
  const [conversation, setConversation] = useState(null);
  const friendId = conversation?.participants?.filter((participant) => participant !== userId)[0] ?? null;
  const ConversationViewWithSearch = WithSearch(ConversationView, { INDEX_NAME: 'conversations' });
  const socket = useSocket();

  const isXXL = useMediaQuery({ minWidth: 1445 });
  const isXS = useMediaQuery({ maxWidth: 576 });

  useEffect(() => {
    socket?.on('open-conversation', (conversation) => {
        console.log(conversation)
      if (!conversation) return;
      setConversation(conversation);
    });

    return () => {
      socket?.off('open-conversation');
    };
  }, [socket]);

  const deleteConversation = ()=> setConversation(null)


  const renderColumns = () => {
    if (isXXL) {
      return (
        <>
          <Col style={{ padding: '1rem', borderRight: '1px solid var(--color-light)' }} className='conversationPage-item' span={7}>
            <ConversationViewWithSearch title='Message' />
          </Col>
          <Col className='conversationPage-item' span={10}>
            {!conversation?._id && <EmptyConversation />}
            {conversation?._id && <BoxMessage messenger={true} conversationId={conversation?._id} />}
          </Col>
          <Col style={{ padding: '1rem', borderLeft: '1px solid var(--color-light)' }} className='conversationPage-item' span={6}>
            {!conversation?._id && <Empty style={{ position: 'absolute', top: '50%', left: '0', right: '0', bottom: '0' }} image={Empty.PRESENTED_IMAGE_SIMPLE} />}
            {!!friendId && <InformationUser userId={friendId} />}
          </Col>
        </>
      );
    } else if (isXS) {
      if (!conversation?._id) {
        return (
          <Col style={{ padding: '1rem', borderRight: '1px solid var(--color-light)' }} className='conversationPage-item' span={24}>
            <ConversationViewWithSearch title='Message' />
          </Col>
        );
      } else {
        return (
          <Col className='conversationPage-item box' span={24} >
            <BoxMessage messenger={true} conversationId={conversation?._id} deleteConversation={deleteConversation}/>
          </Col>
        );
      }
    } else {
      return (
        <>
          <Col style={{ padding: '1rem', borderRight: '1px solid var(--color-light)' }} className='conversationPage-item' span={12}>
            <ConversationViewWithSearch title='Message' />
          </Col>
          <Col className='conversationPage-item' span={12}>
            {!conversation?._id && <EmptyConversation />}
            {conversation?._id && <BoxMessage messenger={true} conversationId={conversation?._id} />}
          </Col>
        </>
      );
    }
  };

  return (
    <div className='conversationPage-container'>
      <div className='conversationPage-center'>
        <Row>
          {renderColumns()}
        </Row>
      </div>
    </div>
  );
};

export default ConversationsPage;

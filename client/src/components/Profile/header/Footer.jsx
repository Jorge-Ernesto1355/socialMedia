import { Alert, Spin, Tabs, Typography} from 'antd';
import React from 'react'
import profileProvider from '../ProfileProvider';
import { useMediaQuery } from 'react-responsive';
import useUserRequest from '../../../hooks/auth/useUserRequest';
import AuthProvider from '../../../zustand/AuthProvider';
import { useQuery } from 'react-query';
import UserService from '../../../services/UserService';
import { LoadingOutlined, WarningOutlined } from '@ant-design/icons';

export const objectFooterProfile = {
  usersPosts: "usersPosts", 
  favorites: "favorites", 
  about: "about",
  stories: "stories", 
  reactions: "reactions"
}

const { Text } = Typography;

const Footer = ({userId}) => {
  const { setTab } = profileProvider();
  const privateRequest = useUserRequest();
  const { userId: currentUser } = AuthProvider();
  const isTiny = useMediaQuery({ maxWidth: 800 });

  const { data: user, isLoading: isLoadingUser, isError  } = useQuery(
    ["user-footer", userId],
    () => UserService.getUser({ privateRequest, userId, options: ["forbiddenReactions", "forbiddenFavorites"] }),
    {
      retry: 1,
      retryDelay: 1000,
    }
  );



  const loadingIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />;

  const createTabItem = (key, label, condition) => {
    if(condition) return ({
      key,
      label: isLoadingUser ? <span>{label} <Spin indicator={loadingIcon} /></span> : label,
    });
  }

  const items = [
    createTabItem(objectFooterProfile.usersPosts, 'Publications', true),
    createTabItem(objectFooterProfile.favorites, 'Favorites', !user?.forbiddenFavorites || userId === currentUser),
    createTabItem(objectFooterProfile.stories, 'Stories', true),
    createTabItem(objectFooterProfile.reactions, 'Reactions', !user?.forbiddenReactions || userId === currentUser),
    ...(isTiny ? [createTabItem(objectFooterProfile.about, 'Information', true)] : [])
  ];

  if (isError || !user) {
    return (
      <div style={{ textAlign: 'center', padding: '10px' }}>
        <WarningOutlined style={{ color: '#faad14', marginRight: '8px' }} />
        <Text type="secondary">
          {isError ? "Couldn't load user info" : "User not found"}
        </Text>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', minHeight: '48px' }}>
      {isLoadingUser ? (
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255, 255, 255, 0.8)' }}>
          <Spin indicator={loadingIcon} />
        </div>
      ) : (
      <Tabs defaultActiveKey="1" items={items} onChange={setTab} />
      )}
    </div>
  );
}

export default Footer
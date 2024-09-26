import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Divider, Flex, Row, Tag, Typography, Skeleton } from 'antd';
import { useQuery } from 'react-query';
import './InformationUser.css';
import EmailIcon from '../icons/EmailIcon';
import PhoneIcon from '../icons/PhoneIcon';
import PlaceMarker from '../../../components/Profile/Details/icons/PlaceMarker';
import useUserRequest from '../../../hooks/auth/useUserRequest';
import userService from '../../../services/UserService';

const { Text, Title } = Typography;

const InformationUser = ({ userId }) => {
  const privateRequest = useUserRequest();
  const { data: user, isLoading, error } = useQuery(
    ["userToFriend", userId],
    () => userService.getUser({
      privateRequest,
      userId,
    }),
    {
      retry: 3,
      refetchOnWindowFocus: false,
    }
  );

  const renderContactItem = (icon, title, value) => (
    <Flex gap={10} align='center' className='informationUser-contact-item'>
      <div className='informationUser-contact-icon'>
        {icon}
      </div>
      <Flex vertical>
        <Text type='secondary'>{title}</Text>
        <Title level={5} style={{ margin: 0 }}>{value}</Title>
      </Flex>
    </Flex>
  );

  const renderContent = () => (
    <>
      <Flex vertical className='informationUser-header'>
        <Avatar src={user?.imageProfile?.url} size={80} icon={<UserOutlined />} />
        <Title style={{ marginBottom: '0' }} level={5}>{user?.username ?? "UniVerse user"}</Title>
        <Text type='secondary'>{user?.email}</Text>
        {user?.bio && (
          <>
            <Text>Bio</Text>
            <Text type='secondary' style={{ width: "100%", textAlign: "center" }}>
              {user.bio}
            </Text>
          </>
        )}
      </Flex>
      <Divider />
      <Flex vertical style={{ width: "100%" }}>
        <ul className='informationUser-contact-container'>
          {renderContactItem(<EmailIcon />, "Email", user?.email)}
          {renderContactItem(<PhoneIcon />, "Phone", user?.phone ? `+ ${user.phone}` : "No phone assigned")}
          {renderContactItem(<PlaceMarker />, "Address", user?.city && user?.state && user?.country ? `${user.city}, ${user.state}, ${user.country}` : "No address assigned")}
          
          <Title level={5} style={{ marginTop: "1rem" }}>Preferences</Title>
          <div className="details-tags-container">
            {user?.interests?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </ul>
      </Flex>
    </>
  );

  const renderSkeleton = () => (
    <Flex vertical align="center" style={{ width: "100%" }}>
      <Skeleton.Avatar active size={80} style={{ marginBottom: '16px' }} />
      <Skeleton.Input active size="small" style={{ width: 150, marginBottom: '8px' }} />
      <Skeleton.Input active size="small" style={{ width: 200, marginBottom: '16px' }} />
      <Skeleton.Input active size="small" style={{ width: '80%', marginBottom: '16px' }} />
      <Divider />
      <Skeleton.Input active size="small" style={{ width: '90%', marginBottom: '16px' }} />
      <Skeleton.Input active size="small" style={{ width: '90%', marginBottom: '16px' }} />
      <Skeleton.Input active size="small" style={{ width: '90%', marginBottom: '16px' }} />
      <Skeleton.Input active size="small" style={{ width: 100, marginBottom: '16px' }} />
      <Flex gap={8}>
        <Skeleton.Button active size="small" />
        <Skeleton.Button active size="small" />
        <Skeleton.Button active size="small" />
      </Flex>
    </Flex>
  );

  if (error) {
    return <div>Error loading user information. Please try again later.</div>;
  }

  return (
    <div className='informationUser-container'>
      {isLoading ? renderSkeleton() : renderContent()}
    </div>
  );
};

export default InformationUser;
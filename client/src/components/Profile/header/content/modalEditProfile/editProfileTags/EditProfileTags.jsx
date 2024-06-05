import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input, Tag, theme } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import './tags.css'
  const EditProfileTags = ({handleTags}) => {
    const { token } = theme.useToken();
    const [tags, setTags] = useState(["programming", "react", "javascript"]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    useEffect(() => {
      if (inputVisible) {
        inputRef.current?.focus();
      }
    }, [inputVisible]);
    const handleClose = (removedTag) => {
      const newTags = tags.filter((tag) => tag !== removedTag);
      handleTags(newTags)
      setTags(newTags);
    };
    const showInput = () => {
      setInputVisible(true);
    };
    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };
    const handleInputConfirm = () => {
      if (inputValue && tags.indexOf(inputValue) === -1) {
        handleTags([...tags, inputValue])
        setTags([...tags, inputValue]);
      }
      setInputVisible(false);
      setInputValue('');
    };
    const forMap = (tag) => (
      <span
        key={tag}
        style={{
          display: 'inline-block',
        }}
      >
        <Tag
            style={{margin: "5px"}}
          closable
          onClose={(e) => {
            e.preventDefault();
            handleClose(tag);
          }}
        >
          {tag}
        </Tag>
      </span>
    );
    const tagChild = tags.map(forMap);
    const tagPlusStyle = {
      background: token.colorBgContainer,
      borderStyle: 'dashed',
    };
    return (
      <>
        <div
        className='tags-container'
          style={{
            marginBottom: 16,
            
          }}
        >
          <TweenOneGroup
            appear={false}
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
            }}
            leave={{
              opacity: 0,
              width: 0,
              scale: 0,
              duration: 200,
            }}
            onEnd={(e) => {
              if (e.type === 'appear' || e.type === 'enter') {
                e.target.style = 'display: inline-block';
              }
            }}
          >
            {tagChild}
          </TweenOneGroup>
        </div>
        {inputVisible ? (
          <Input
            ref={inputRef}
            type="text"
            size="small"
            style={{
              width: 78,
            }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        ) : (
          <Tag onClick={showInput} style={tagPlusStyle}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </>
    );
  };

export default EditProfileTags
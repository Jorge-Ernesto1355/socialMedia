import React, { useState } from 'react'
import UserService from '../../../../services/UserService';
import { useQuery } from 'react-query';
import { Select } from 'antd';
import { debounce } from 'lodash';

const SelectCity = ({city, handleInfoLocation}) => {

    const [searchValue, setSearchValue] = useState(city ?? '');
    
    const {data, isLoading, refetch} = useQuery(['city', city], ()=> UserService.getCities({city: searchValue}), {
        enabled: !!searchValue
    }) 
    
    const debouncedSearch = debounce((value) => {
        handleInfoLocation({name: "city", value})
        setSearchValue(value)
        refetch({city: value})
      }, 1000);

    

    const options = data?.data?.map((city)=> {

        return {
            value: city?.name, 
            label: city?.name
        }
    }) ?? []

    const handleChange = (value) => {
        handleInfoLocation({name: "city", value})
        setSearchValue(value)
        refetch({city: value})
      }

   
  return (
    <Select
    showSearch
    loading={isLoading}
    disabled={isLoading}
    value={searchValue}
    defaultValue={city}
    placeholder={"select your country"}
    style={{width: "100%"}}
    defaultActiveFirstOption={false}
    onChange={handleChange}
    filterOption={false}
    onSearch={debouncedSearch}
    notFoundContent={null}
    options={(options || []).map((d) => ({
      value: d.value,
      label: d.text,
    }))}
  />
  )
}

export default SelectCity
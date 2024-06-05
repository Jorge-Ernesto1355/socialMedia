import { Select } from 'antd'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import UserService from '../../../../services/UserService'
import { debounce } from 'lodash';

const SelectCountry = ({country="country", handleInfoLocation}) => {

    
   
    const [searchValue, setSearchValue] = useState(country ?? '');
    
    const {data, isLoading, refetch} = useQuery(['countries', country], ()=> UserService.getCountries({country: searchValue}), {
        enabled: !!searchValue
    }) 
    
    const debouncedSearch = debounce((value) => {
       
        handleInfoLocation({name: "country", value})
        setSearchValue(value)
        refetch({country: value})
      }, 500);

    const options = data?.data?.map((country)=> {
        return {
            value: country.name, 
            label: country.name
        }
    }) ?? []

    const handleChange = (newValue) => {
       
        handleInfoLocation({name: "country", value: newValue})
        setSearchValue(newValue);
        refetch({country: newValue})
      };
    
  return (
    <Select
    showSearch
    loading={isLoading}
    disabled={isLoading}
    value={searchValue}
    defaultValue={country}
    placeholder={"select your country"}
    style={{width: "100%"}}
    defaultActiveFirstOption={false}

    filterOption={false}
    onSearch={debouncedSearch}
    onChange={handleChange}
    notFoundContent={null}
    options={(options || []).map((d) => ({
      value: d.value,
      label: d.text,
    }))}
  />
  
  )
}

export default SelectCountry
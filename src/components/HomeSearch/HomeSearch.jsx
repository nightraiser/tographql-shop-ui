import React, { useState, useEffect } from 'react'
import { Select, Icon } from 'antd';
import { getRequest } from '../../services/ApiService';
import { useHistory } from 'react-router-dom';
export default function HomeSearch({onChange}) {
    const history = useHistory();
    const [key, setkey] = useState('');
    const [list, setlist] = useState([]);
    const searchRequest = async () => {
        if(key.length > 3) {
            const data = await getRequest(`/products/${key}`);
            setlist(data);
        } 
    }
    useEffect(() => {
        searchRequest();
        
    }, [key])
    const handleSearch = (val) => {
        setkey(val);
    }
    const handleChange = (id) => {
        history.push(`/details/${id}`);
    }
    const options = ( list && list.length > 0)
	? list.map(r => <Select.Option style={{borderBottom:'1px solid #ccc'}} value={r._id}>
			<b>{r.title}</b>
		</Select.Option>) : []
    return (
        <Select
        style={{width: '400px'}}
		suffixIcon={<Icon type="search" />}
		showSearch
		placeholder="Search for dragons, monsters but not logic"
		defaultActiveFirstOption={false}
		showArrow={false}
		filterOption={false}
		onSearch={handleSearch}
		onChange={handleChange}
		notFoundContent={null}
	  >
		  {options}
	  </Select>
    )
}

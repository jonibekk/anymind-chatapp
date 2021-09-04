import { ChangeEvent } from "react";


function DropDownSelect(props: any) {

    const { list, value, onchange } = props;

    const onItemSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        return onchange(e.target.value)
    }

    const getItemsList = (users: string[] | undefined) => {
        return users && users.map(user => <option key={user}>{user}</option>)
    }

    return (
        <select
            style={{ width: '100%', padding: '7px 15px', outline: 'none', marginBottom: '10px' }}
            onChange={onItemSelect}
            value={value}>
            {getItemsList(list)}
        </select>
    )
}

export default DropDownSelect;

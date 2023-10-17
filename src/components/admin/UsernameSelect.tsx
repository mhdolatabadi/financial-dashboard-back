import { MenuItem } from "@mui/material";
import { PersianTexts } from "../../persianTexts";
import { TextField } from "../common";
import { User } from "../../models/user";

interface Props {
    username: string | undefined
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => unknown
    users: Partial<User>[]
    
}
export function UsernameSelect({ username, onChange, users}: Props) {
    return  <div style={{ width: '100%' }}>
        <TextField
          select
          value={username}
          label={PersianTexts.username}
          onChange={onChange}
        >
          {users.map((u) => (
            <MenuItem value={u.username}>{u.username}</MenuItem>
          ))}
        </TextField>
      </div>
}

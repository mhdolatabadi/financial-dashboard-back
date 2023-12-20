import { useState } from 'react'
import moment from 'moment-jalaali'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { UsernameSelect } from '../common/UsernameSelect'
import { AmountUnitTextField } from '../common/AmountUnitTextField'
import { submitTransaction } from '../../settings/api/dataManipulation'
import { ContainedButton, DatePicker, TextField } from '../common'
import { usersView } from '../../pages/user/main.slice'
import { addSelectedTransaction } from '../../pages/user/selected-user.slice'
import { errorToast, successToast } from '../../utils/toast'
import { Units } from '../../models/units'

export function SubmitTransaction() {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const users = useSelector(usersView)

  const [username, setUsername] = useState<string>(users[0].username)
  const [date, setDate] = useState<number>(new Date().getTime())
  const [type, setType] = useState<string>('in')
  const [amount, setAmount] = useState<number>(0)
  const [unit, setUnit] = useState<string>(Units.rial)
  const [description, setDescription] = useState<string>()

  const handleSubmitTransaction = () => {
    if (amount === 0) {
      errorToast(t('messages.nonZeroAmount'))
      return
    }
    const transaction = {
      username,
      date: new Date(date),
      type,
      amount,
      unit,
      description,
    }
    submitTransaction(transaction)
      .then((res) => {
        dispatch(
          addSelectedTransaction({
            id: res.data,
            ...transaction,
            username: undefined,
            date: transaction.date.toLocaleDateString(),
          }),
        )
        successToast(t('messages.successful'))
      })
      .catch(() => {
        errorToast(t('messages.error'))
      })
  }
  return (
    <form
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div>
        <UsernameSelect
          username={username}
          users={users}
          onChange={(e) => setUsername(e.target.value)}
        />
        <DatePicker
          label={t('common.date')}
          value={moment(date)}
          onChange={(value) => setDate(moment(value).valueOf())}
        />
        <AmountUnitTextField
          unit={users.find((u) => u.username === username)?.unit ?? unit}
          onAmountChange={(e) =>
            !Number.isNaN(+e.target.value)
              ? setAmount(+e.target.value)
              : undefined
          }
          amount={amount}
          onUnitChange={(e) => setUnit(e.target.value)}
        />
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ padding: '10px' }}
        >
          <FormControlLabel value="in" control={<Radio />} label={t('deposit')} />
          <FormControlLabel value="out" control={<Radio />} label={t('withdraw')} />
        </RadioGroup>
        <TextField
          multiline
          label={`${t('common.description')} (${t('common.optional')})`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <ContainedButton onClick={handleSubmitTransaction}>
        {t('common.submit')}
      </ContainedButton>
    </form>
  )
}

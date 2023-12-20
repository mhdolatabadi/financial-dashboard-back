import { SectionWithHeader, Table } from '../common'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectedUserTransactionsView,
  setDeleteTransaction,
} from '../../pages/user/selected-user.slice'
import { ReceiptLong } from '@mui/icons-material'
import { deleteTransaction } from '../../settings/api/dataManipulation'
import { useTranslation } from 'react-i18next'
import { errorToast } from '../../utils/toast'

export function TransactionsTable() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const transactions = useSelector(selectedUserTransactionsView)
  const handleDelete = (id: string) => {
    deleteTransaction(id)
      .then(() => {
        dispatch(setDeleteTransaction(id))
      })
      .catch(() => {
        errorToast(t('messages.error'))
      })
  }
  return (
    <SectionWithHeader
      header={t('transactionTable')}
      Icon={<ReceiptLong sx={{ color: 'primary.main' }} />}
    >
      <Table
        type="transaction"
        headers={[
          { value: t('common.date'), width: '100px' },
          { value: t('common.amount'), width: '200px' },
          { value: t('common.description'), width: '' },
        ]}
        values={transactions}
        handleDelete={handleDelete}
      ></Table>
    </SectionWithHeader>
  )
}

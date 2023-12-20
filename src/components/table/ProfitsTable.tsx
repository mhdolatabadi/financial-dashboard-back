import { SectionWithHeader, Table } from '../common'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectedUserProfitsView,
  setDeleteProfit,
} from '../../pages/user/selected-user.slice'
import { Paid } from '@mui/icons-material'
import { deleteProfit } from '../../settings/api/dataManipulation'
import { useTranslation } from 'react-i18next'
import { errorToast } from '../../utils/toast'

export function ProfitsTable() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const profits = useSelector(selectedUserProfitsView)
  const handleDelete = (id: string) => {
    deleteProfit(id)
      .then(() => {
        dispatch(setDeleteProfit(id))
      })
      .catch(() => {
        errorToast(t('messages.error'))
      })
  }
  return (
    <SectionWithHeader
      header={t('profitTable')}
      Icon={<Paid sx={{ color: 'primary.main' }} />}
    >
      <Table
        type="profit"
        headers={[
          { value: t('common.date'), width: '' },
          { value: t('common.amount'), width: '20%' },
          { value: t('common.description'), width: '100%' },
        ]}
        values={profits}
        handleDelete={handleDelete}
      />
    </SectionWithHeader>
  )
}

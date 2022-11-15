import { toastSyncingChainData } from '@/features/app/utils'
import { subManagerContractAddress } from '@/features/s10n/constants'
import { useS10n } from '@/features/s10n/hooks/useS10n'
import { getTimePeriod } from '@/features/s10n/utils'
import { useTokenMethods } from '@/hooks/useToken'
import { useTokenInfo } from '@/hooks/useTokenInfo'
import Blockies from '@/uikit/Blockies'
import { Modal } from '@/uikit/Modal'
import { getDate, getEllipsisText } from '@/utils'
import { handleTxError } from '@/utils/error'
import { BigNumber } from '@ethersproject/bignumber'
import { formatUnits, parseUnits } from '@ethersproject/units'
import { XIcon } from '@heroicons/react/solid'
import { useWeb3React } from '@web3-react/core'
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { menuItems } from '../../constants'
import { renderChainLogo } from '../NetworkLogos'

const maskStyle = { background: 'transparent' }

interface CreateSubscriptionModalProps {
  visible: boolean
  onClose: () => void
  merchantName: string
  merchantTokenId: string
  planIndex: string
  planName: string
  maxTermLength: number
  billingPeriod: number
  paymentToken: string
  price: string
}

const DAY = 24 * 60 * 60 * 1000

const timeMap: Record<string, number> = {
  0: DAY,
  1: 7 * DAY,
  2: 30 * DAY,
  3: 120 * DAY,
  4: 365 * DAY,
}

export const CreateSubscriptionModal: FC<CreateSubscriptionModalProps> = memo(
  ({
    visible,
    merchantName,
    merchantTokenId,
    planIndex,
    planName,
    maxTermLength,
    billingPeriod,
    paymentToken,
    price,
    onClose,
  }) => {
    const { account, chainId } = useWeb3React()
    const startTime = Date.now()
    const endTime = startTime + maxTermLength * (timeMap[billingPeriod] || 0)
    const token = useTokenInfo(paymentToken)
    const [stage, setStage] = useState<'Approve' | 'Subscribe'>('Approve')
    const [tokenAllowance, setTokenAllowance] = useState('0')
    const [tokenBalance, setTokenBalance] = useState('0')
    const { getAllowance, getBalance, approve } = useTokenMethods()
    const [approveAmount, setApproveAmount] = useState<number | undefined>(() => {
      return Number(formatUnits(price, token?.decimals || 6)) * maxTermLength
    })

    const { createSub } = useS10n()

    const isAllowanceEnough = useMemo(() => {
      return BigNumber.from(tokenAllowance).gte(BigNumber.from(price).mul(maxTermLength))
    }, [maxTermLength, price, tokenAllowance])

    const isBalanceEnough = useMemo(() => {
      return BigNumber.from(tokenBalance).gte(BigNumber.from(price))
    }, [price, tokenBalance])

    const updateUserTokenAllowance = useCallback(async () => {
      const allowance = await getAllowance(paymentToken, account!, subManagerContractAddress)
      setTokenAllowance(allowance.toString())
      return allowance.toString()
    }, [account, getAllowance, paymentToken])

    const handleAddAllowance = useCallback(async () => {
      await handleTxError(async () => {
        const approveAmountBigNumber = parseUnits(String(approveAmount), token?.decimals || 6).add(tokenAllowance)
        const tx = await approve(paymentToken, subManagerContractAddress, approveAmountBigNumber.toString())
        const txAddAllowance = tx.wait()
        toast.promise(
          txAddAllowance,
          {
            pending: 'Adding Allowance',
            success: 'Add Allowance Success! 👌',
            error: 'Add Allowance Failed! 🤯',
          },
          { theme: 'dark' }
        )
        await txAddAllowance
        toastSyncingChainData()
        setStage('Subscribe')
        await updateUserTokenAllowance()
      })
    }, [approve, approveAmount, paymentToken, token?.decimals, tokenAllowance, updateUserTokenAllowance])

    useEffect(() => {
      if (account && paymentToken && subManagerContractAddress) {
        getBalance(paymentToken, account!)
          .then((res) => {
            console.log(paymentToken, res.toString())
            setTokenBalance(res.toString())
          })
          .catch((e) => {
            console.log(e)
          })
      }
    }, [account, getBalance, paymentToken])

    useEffect(() => {
      if (account && paymentToken) {
        updateUserTokenAllowance()
      }
    }, [account, getAllowance, paymentToken, updateUserTokenAllowance])

    const selectedChainInfo = menuItems.find((item) => item.chainId === chainId)

    const handleSubscribe = useCallback(async () => {
      await handleTxError(async () => {
        const tx = await createSub({ merchantTokenId: Number(merchantTokenId), planIndex: Number(planIndex) })
        onClose()
        const txPromise = tx.wait()
        toast.promise(
          txPromise,
          {
            pending: 'Subscription is pending',
            success: 'Subscription Success! 👌',
            error: 'Subscription Failed! 🤯',
          },
          { theme: 'dark' }
        )
        await txPromise
        window.open(`http://${window.location.host}/consumer/subscription`)
      })
    }, [createSub, merchantTokenId, onClose, planIndex])

    return (
      <Modal visible={visible} onMaskClick={onClose} maskStyles={maskStyle}>
        <div className="max-w-full max-h-[90vh] overflow-y-auto bg-zinc-800 dark:bg-zinc-600 dark:bg-opacity-80 bg-opacity-80 border border-gray-500 backdrop-blur rounded-2xl shadow-2xl">
          <div className="h-10 flex items-center justify-end px-4">
            <XIcon className="w-5 h-5 text-white cursor-pointer" onClick={onClose} />
          </div>
          <div className="flex flex-col md:flex-row px-8 mb-4">
            <div className="flex md:flex-col w-full md:w-48 items-center md:items-start mr-32 justify-between md:justify-start">
              <span className="md:mb-2">Current Network:</span>
              {chainId && (
                <div className="flex items-center px-2 md:px-4 py-2 rounded-full md:border-2 sm:border-gray-200 ">
                  {renderChainLogo(selectedChainInfo?.icon)}
                  <span className="ml-2 font-semibold dark:text-white ">{selectedChainInfo?.value}</span>
                </div>
              )}
            </div>
            <div className="flex md:flex-col w-full md:w-48 items-center md:items-start justify-between md:justify-start">
              <span className="md:mb-2">Subscribe Addresss:</span>
              <div className="flex items-center border-0 md:border-2 border-gray-50  py-1 md:px-4 rounded-3xl">
                <p className="text-white font-bold">{getEllipsisText(account!, 6)}</p>
                <Blockies seed={account!} className="ml-2 rounded-full " />
              </div>
            </div>
          </div>
          <div className="w-full border-t border-gray-400 border-b py-4 px-8">
            <h1 className="text-2xl font-bold mb-2">{planName}</h1>
            <p>{`${getDate(startTime)} - ${getDate(endTime)}`}</p>
            <div className="w-full mt-4 mb-4 text-white flex justify-center items-baseline">
              <span className="text-xl mr-4">{token?.symbol}</span>
              <span className="text-3xl">${formatUnits(price, token?.decimals)} /</span>
              <span className="text-base">{getTimePeriod(billingPeriod)}</span>
            </div>
          </div>
          <div className="mt-3 w-full flex flex-col items-center px-4">
            <ul className="steps">
              <li className="step mx-5 step-primary cursor-pointer" onClick={() => setStage('Approve')}>
                Approve
              </li>
              <li className={`step ${stage === 'Subscribe' ? 'step-primary' : ''}`}>Subscribe</li>
            </ul>
            {stage === 'Approve' && (
              <div className="mt-4 w-full flex flex-col items-center">
                <div className="flex">
                  <span className="w-40 text-right">Your Balance:</span>
                  <span className="w-52 pl-2">
                    {formatUnits(tokenBalance, token?.decimals)} {token?.symbol}
                  </span>
                </div>
                <div className="flex mt-1">
                  <span className="w-40 text-right">Current Allowance:</span>
                  <span className="w-52 pl-2">
                    {formatUnits(tokenAllowance, token?.decimals)} {token?.symbol}
                  </span>
                </div>
                <div className="mt-4">
                  <span>Add Allowance</span>
                  <input
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered w-36 h-8 mx-4"
                    value={approveAmount}
                    onChange={(e) => {
                      const newValue = e.target.value
                      if (newValue === '') {
                        setApproveAmount(undefined)
                      } else {
                        setApproveAmount(Math.max(Number(newValue), 0))
                      }
                    }}
                  />
                  <span>{token?.symbol}</span>
                </div>
                <div className="mt-4 flex w-full justify-center">
                  <div className="relative flex justify-center flex-col">
                    <button className="text-white btn btn-success btn-sm w-32 h-10" onClick={handleAddAllowance}>
                      Approve
                    </button>
                    {isAllowanceEnough && (
                      <div
                        className="mt-3 md:mt-0 link md:absolute md:top-2 md:left-36 whitespace-nowrap"
                        onClick={() => {
                          setStage('Subscribe')
                        }}
                      >
                        Skip Approve More
                      </div>
                    )}
                  </div>
                </div>
                <span className="mt-4 max-w-lg text-sm">
                  {`By subscribing, you are allowing "${merchantName}" to charge your wallet for this payment and future
                  payments, in accordance with their terms.`}
                </span>
                <div className="w-full text-center mt-10">Powered by @s10nprotocol</div>
              </div>
            )}
            {stage === 'Subscribe' && (
              <div className="mt-4 w-full flex flex-col items-center">
                <div className="flex">
                  <span className="font-bold mr-2 w-40 text-right">Your Balance:</span>
                  <span className="w-52 pl-2">${formatUnits(tokenBalance, token?.decimals)}</span>
                </div>
                <div className="flex mt-1">
                  <span className="font-bold mr-2 w-40 text-right">Approved Left:</span>
                  <span className="w-52 pl-2">${formatUnits(tokenAllowance, token?.decimals)}</span>
                </div>
                <div className="flex mt-2 text-lg">
                  <span className="font-bold mr-2 w-40 text-right">First Charge:</span>
                  <span className="w-52 pl-2">${formatUnits(price, token?.decimals)}</span>
                </div>
                <div className="mt-4 flex w-full justify-center">
                  <div className="relative flex justify-center">
                    <button
                      className="text-white btn btn-success btn-sm w-32 h-10"
                      onClick={handleSubscribe}
                      disabled={!isBalanceEnough}
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
                <span className="mt-4 max-w-lg text-sm">
                  {`By subscribing, you are allowing "${merchantName}" to charge your wallet for this payment and future
                  payments, in accordance with their terms.`}
                </span>
                <div className="w-full text-center mt-10">Powered by @s10nprotocol</div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    )
  }
)

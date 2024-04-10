import { Layout, Card, Statistic, List, Typography, Spin } from 'antd';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { fakeFetchCrypto, fetchAssets } from '../../api';
const siderStyle = {
    padding: '1rem',
};
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

export default function AppSider() {

    const [loading, setLoading] = useState(false)
    const [crypto, setCrypto] = useState([])
    const [assets, setAssets] = useState([])

    useEffect(() => {
        async function preload() {
            setLoading(true)
            const { result } = await fakeFetchCrypto()
            const assets = await fetchAssets()

            setAssets(assets.map((asset) =>{
                const coin = result.find((c) => c.id === asset.id)
                return {
                    grow: asset.price < coin.price
                    ...assets
                }
            }))
            setCrypto(result)
            setLoading(false)
        }
        preload()

    }, [])
if (loading) {
    return <Spin fullscreen />
}
    return (
        <Layout.Sider width="25%" style={siderStyle}>
            <Card style={{ marginBottom: '1rem' }}>
                <Statistic title="Active"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%" />
                <List
                size='small'
                    dataSource={data}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text mark>[ITEM]</Typography.Text> {item}
                        </List.Item>
                    )}
                />
            </Card>
            <Card>
                <Statistic
                    title="Idle"
                    value={9.3}
                    precision=
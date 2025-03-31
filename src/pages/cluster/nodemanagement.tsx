import React, { useState, useEffect } from 'react';
import { Table, Progress, Modal, Input, Button, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios, { AxiosError } from 'axios';
import './NodeManagement.css'; // 自定义样式
import admuserService, { NodeData, NodeListReq, NodeListRes} from '@/api/services/admuserService'; 
import {nodeList, useAdmApiToken} from 'src/store/admuserStore';
// import { useMutation } from "@tanstack/react-query";
import { t } from "@/locales/i18n";
import { toast } from "sonner";

const { confirm } = Modal;

// // 定义节点数据类型
// interface NodeData {
//   Id: string;
//   NodeName: string;
//   ClusterId: string;
//   Follow: string;
//   NodeAddr: string;
//   TotalSpace: number; // kB
//   UsedSpace: number; // kB
//   FileCount: number;
//   Created: string;
//   LastRegistered: string;
//   TotalSpaceDesc?: string; 
//   UsedSpaceDesc?: string; 
// }

// const getNodeList = async () => {
  
  // try { 
  //     const req :NodeListReq = {};
  //     const apiToken : string = useMgrInfoStore().admApiToken;
  //     // const res: NodeListRes = await listMutation.mutateAsync(req);
  //     const res = await nodeList(req);
  //     if (res == null ) {
  //       toast.success("Request Api failed!");
  //       return;
  //     }
  //     const { errcode, errmsg, result, LoginInfo } = res;
  
  //     console.log('will get res:', res);
  //     if (errcode != '0') {
  //       throw new Error(t("sys.api.apiRequestFailed")+':'+errmsg);
  //     }
  
  //     // setNodes(result.list ?? []);
  
  //     toast.success("Request Api success!");
  //   } catch (err) {
  //     toast.error(err.message, {
  //       position: "top-center",
  //     });
  //   }
// }

const NodeManagement = () => {
  const [nodes, setNodes] = useState<NodeData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  
  const [spaceModalVisible, setSpaceModalVisible] = useState<boolean>(false);
  const [currentNode, setCurrentNode] = useState<NodeData | null>(null);
  const [spaceValue, setSpaceValue] = useState<string>('');
  
  // 模拟从后端获取节点数据
  const fetchNodes = async () => {
    setLoading(true);
    try {
      // 这里应该是你的API调用
      // const response = await axios.get<NodeData[]>('/api/nodes');
      // setNodes(response.result.list);
      // 模拟数据
      const mockNodes: NodeData[] = [
        {
          Id: '1',
          NodeName: '节点1',
          ClusterId: '节点1',
          Follow: '节点1',
          NodeAddr: '192.168.1.101',
          TotalSpace: 102400, // kB
          UsedSpace: 51200, // kB
          FileCount: 1250,
          Created: '2023-01-15 10:30:00',
          LastRegistered: '2023-06-01 14:25:00'
        },
        {
          Id: '2',
          NodeName: '节点2',
          ClusterId: '节点1',
          Follow: '节点1',
          NodeAddr: '192.168.1.102',
          TotalSpace: 204800, // kB
          UsedSpace: 153600, // kB
          FileCount: 3120,
          Created: '2023-02-20 09:15:00',
          LastRegistered: '2023-06-01 14:22:00'
        },
        {
          Id: '3',
          NodeName: '节点3',
          ClusterId: '节点1',
          Follow: '节点1',
          NodeAddr: '192.168.1.103',
          TotalSpace: 51200, // kB
          UsedSpace: 10240, // kB
          FileCount: 450,
          Created: '2023-03-10 14:00:00',
          LastRegistered: '2023-06-01 14:20:00'
        }
      ];
      // setNodes(mockNodes);
  
      try { 
        const req :NodeListReq = {};
        const apiToken : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncGEiOiIxLjAuMTc0MzIxNTQ3MyJ9.Yk7Z0eOwkTm6fdOw3RtLZ0M1D2cXMm7XU1gt-wX4twM';// useAdmApiToken(); // 就在这一步会报错
        // const res: NodeListRes = await listMutation.mutateAsync(req);
        // const res = await nodeList(req);
        const res = await admuserService.nodeList(req, apiToken);
        if (res == null ) {
          toast.success("Request Api failed!");
          return;
        }
        const { errcode, errmsg, result, LoginInfo } = res;
    
        console.log('api got res:', res);
        if (errcode != '0') {
          throw new Error(t("sys.api.apiRequestFailed")+':'+errmsg);
        }
    
        setNodes(result.list ?? []);
    
        // toast.success("Request Api success!");
      } catch (err) {
        console.log(err);
        // toast.error(err.message, {
          //   position: "top-center",
          // });
        // setNodes(mockNodes);
      }
        // const response = await nodeList<NodeListRes>(req);
        // const response = await nodeList(req);
        
    } catch (error) {
      console.log(error);
      // const axiosError = error as AxiosError;
      // toast.success(`获取节点信息失败: ${axiosError.message}`);
      // setNodes(mockNodes);
    } finally {
      setLoading(false);
    }
  };
  
  // const listMutation = useMutation({
    //   mutationFn: admuserService.nodeList,
    // });
    
  //   (async () => {
  //   const req :NodeListReq = {};  
  // })();



  useEffect(() => {
    fetchNodes();
  }, []);

  // 设置空间
  const handleSetSpace = (node: NodeData) => {
    setCurrentNode(node);
    setSpaceModalVisible(true);
  };

  // 提交空间设置
  const handleSpaceSubmit = async () => {
    if (!spaceValue || isNaN(parseInt(spaceValue))) {
      toast.success('请输入有效的空间值');
      return;
    }

    try {
      // 这里应该是你的API调用
      // await axios.post('/api/set-space', { 
      //   nodeId: currentNode?.id, 
      //   space: parseInt(spaceValue) 
      // });
      
      toast.success('空间设置成功');
      setSpaceModalVisible(false);
      setSpaceValue('');
      
      // 刷新节点数据
      // const response = await axios.get<NodeData[]>('/api/nodes');
      // setNodes(response.data);
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.success(`空间设置失败: ${axiosError.message}`);
    }
  };

  // Kick节点
  const handleKick = (node: NodeData) => {
    confirm({
      title: '确认要踢出该节点吗?',
      icon: <ExclamationCircleOutlined />,
      content: `节点名称: ${node.NodeName}`,
      onOk: async () => {
        try {
          // 这里应该是你的API调用
          // await axios.post('/api/kick-node', { nodeId: node.id });
          
          message.success('节点已踢出');
          // 刷新节点数据
          // const response = await axios.get<NodeData[]>('/api/nodes');
          // setNodes(response.data);
        } catch (error) {
          const axiosError = error as AxiosError;
          message.error(`踢出节点失败: ${axiosError.message}`);
        }
      }
    });
  };

  // Invite节点
  const handleInvite = (node: NodeData) => {
    confirm({
      title: '确认要邀请该节点吗?',
      icon: <ExclamationCircleOutlined />,
      content: `节点名称: ${node.NodeName}`,
      onOk: async () => {
        try {
          // 这里应该是你的API调用
          // await axios.post('/api/invite-node', { nodeId: node.id });
          
          message.success('节点已邀请');
          // 刷新节点数据
          // const response = await axios.get<NodeData[]>('/api/nodes');
          // setNodes(response.data);
        } catch (error) {
          const axiosError = error as AxiosError;
          message.error(`邀请节点失败: ${axiosError.message}`);
        }
      }
    });
  };

  // 新增一个计算时间差和颜色的函数
  const getHeartbeatColor = (lastHeartbeat: string): string => {
    const now = new Date();
    const heartbeatTime = new Date(lastHeartbeat);
    const diffInMinutes = (now.getTime() - heartbeatTime.getTime()) / (1000 * 60);
    
    if (diffInMinutes <= 1) return 'green';
    if (diffInMinutes <= 5) return 'orange';
    return 'red';
  };

  // 表格列定义
  const columns = [
    {
      title: '节点名称',
      dataIndex: 'name',
      key: 'name',
      width: 450,
      render: (text: string, record: NodeData) => (
        <div className="node-info" style={{ height: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="node-name" style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>
            Name: {text}{record.NodeName}
          </div>
          <div className="node-details" style={{ lineHeight: '1.8' }}>
            <div className="detail-row">
                {record.Follow == record.NodeName ?
                 <b>This is Master</b>
                 :
                 <>
                 <span className="detail-label">Follow:</span>
                 <span className="detail-value">{record.Follow}</span>
                 </>
                 }
            </div>
            <div className="detail-row">
              <span className="detail-label">ClusterId:</span>
              <span className="detail-value">{record.ClusterId}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Addr:</span>
              <span className="detail-value">{record.NodeAddr}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Join Time:</span>
              <span className="detail-value">{record.Created}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label" style={{ color: getHeartbeatColor(record.LastRegistered) }}>
                Last Heartbeat:
              </span>
              <span className="detail-value" style={{ color: getHeartbeatColor(record.LastRegistered) }}>
                {record.LastRegistered}
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: '容量信息',
      key: 'capacity',
      render: (record: NodeData) => (
        <div className="capacity-info">
          <div className="capacity-text">
            {`${(record.UsedSpace / 1024).toFixed(1)} MB / ${(record.TotalSpace / 1024).toFixed(1)} MB`}
          </div>
          <Progress
            percent={Math.round((record.UsedSpace / record.TotalSpace) * 100)}
            status={record.UsedSpace / record.TotalSpace > 0.9 ? 'exception' : 'normal'}
            showInfo={false}
          />
        </div>
      )
    },
    {
      title: '文件数',
      dataIndex: 'files',
      key: 'files',
      width: 100,
      // render: (text: number) => <span>{text.toLocaleString()}</span>
      render: (text: number) => <span>{text}</span>
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: any, record: NodeData) => (
        <div className="action-buttons">
          <Button type="link" onClick={() => handleSetSpace(record)}>设置空间</Button>
          <Button type="link" danger onClick={() => handleKick(record)}>Kick</Button>
          <Button type="link" onClick={() => handleInvite(record)}>Invite</Button>
        </div>
      )
    }
  ];

  return (
    <div className="node-management-container">
      <h2>集群节点管理</h2>
      
      <Table
        columns={columns}
        dataSource={nodes}
        rowKey="id"
        loading={loading}
        pagination={false}
        size="large"
        scroll={{ x: 'max-content' }}
      />
      
      {/* 设置空间弹窗 */}
      <Modal
        title="设置节点空间"
        visible={spaceModalVisible}
        onOk={handleSpaceSubmit}
        onCancel={() => {
          setSpaceModalVisible(false);
          setSpaceValue('');
        }}
      >
        <div className="space-modal">
          <p>节点: {currentNode?.NodeName}</p>
          <Input
            placeholder="请输入空间大小 (kB)"
            value={spaceValue}
            onChange={(e) => setSpaceValue(e.target.value)}
            suffix="kB"
          />
        </div>
      </Modal>
    </div>
  );
};

export default NodeManagement;
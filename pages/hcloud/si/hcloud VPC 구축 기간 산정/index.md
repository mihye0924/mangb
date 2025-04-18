---
author: 조미혜
title: hcloud VPC 구축 기간 산정
thumbnail: thumbnail.png
refer:
tags: [HCloud, Vue]
layout: article
sidebar: false
created: 2025.05.01
avatar: true
---

### - 일정

![](01.png)

- #### USER

| Depth1                                        | Depth2                                           | Depth3                                                        | Depth4              |
| --------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------- | ------------------- |
| <span style="color:blue"><b>서비스</b></span> | <span style="color:red"><b>hCloud VPC</b></span> | <span style="color:green"><b>Dashboard</b></span>             | (1)                 |
|                                               |                                                  | <span style="color:green"><b>Virtual Private Cloud</b></span> | VPC(4)              |
|                                               |                                                  | -                                                             | Subnet(4)           |
|                                               |                                                  | -                                                             | Interface(4)        |
|                                               |                                                  | -                                                             | Internet Gateway(5) |
|                                               |                                                  | -                                                             | NAT Gateway(5)      |
|                                               |                                                  | -                                                             | VPC Peering(5)      |
|                                               |                                                  | <span style="color:green"><b>Security</b></span>              | Network ACL(5)      |
|                                               |                                                  | -                                                             | Security Group(5)   |
|                                               |                                                  | <span style="color:green"><b>Traffic Management</b></span>    | Log Backend(5)      |
|                                               |                                                  | -                                                             | Flow Log(5)         |

- #### ADMIN

| Depth1                                            | Depth2                                           | Depth3                                                        | Depth4 |
| ------------------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------- | ------ |
| <span style="color:blue"><b>공통관리</b></span>   | <span style="color:red"><b>Tutorial</b></span>   | <span style="color:green;"><b>Audit</b></span>                | (1)    |
| -                                                 | -                                                | <span style="color:green;"><b>Admin 권한 관리 </b></span>     | (1)    |
| <span style="color:blue"><b>게시판관리</b></span> | <span style="color:red"><b>공지사항</b></span>   | <span style="color:green;"><b>탭</b></span>                   | (1)    |
| -                                                 | -                                                | <span style="color:green;"><b>생성</b></span>                 | (1)    |
| <span style="color:blue"><b>리소스관리</b></span> | <span style="color:red"><b>hCloud VPC</b></span> | <span style="color:green;"><b>Openstack Project</b></span>    | (5)    |
| -                                                 | -                                                | <span style="color:green;"><b>External Network</b></span>     | (5)    |
| -                                                 | -                                                | <span style="color:green;"><b>Admin VPC</b></span>            | (5)    |
| -                                                 | -                                                | <span style="color:green;"><b>User VPC</b></span>             | (5)    |
| -                                                 | -                                                | <span style="color:green;"><b>Floating IP</b></span>          | (5)    |
| -                                                 | -                                                | <span style="color:green;"><b>Admin Security Group</b></span> | (5)    |
| -                                                 | -                                                | <span style="color:green;"><b>QoS</b></span>                  | (5)    |

- #### USER ( 운영 )
  | Depth1                                        | Depth2                                          | Depth3                                              | Depth4      |
  | --------------------------------------------- | ----------------------------------------------- | --------------------------------------------------- | ----------- |
  | <span style="color:blue"><b>공통</b></span>   | <span style="color:red"><b>Tutorial</b></span>  |                                                     | (1)         |
  | <span style="color:blue"><b>서비스</b></span> | <span style="color:red"><b>Help</b></span>      | <span style="color:green"><b>FAQ</b></span>         | (1)         |
  |                                               | -                                               | <span style="color:green"><b>User Manual</b></span> | (1)         |
  |                                               | <span style="color:red"><b>Dashboard</b></span> | -                                                   | (1)         |
  |                                               | <span style="color:red"><b>LNB</b></span>       | -                                                   | (1)         |
  |                                               | <span style="color:red"><b>HCS</b></span>       | <span style="color:green"><b>Server</b></span>      | Instance(5) |
  |                                               | <span style="color:red"><b>HKS</b></span>       | <span style="color:green"><b>Cluster</b></span>     | (5)         |
  |                                               | <span style="color:red"><b>HLB</b></span>       | <span style="color:green"><b>CLB</b></span>         | (5)         |

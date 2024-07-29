---
author: 조미혜
title: HKS > Cluster NodePool 관련 운영
thumbnail: thumbnail.png
refer: 
tags: [HCloud, Vue]
layout: article
sidebar: false
created: 2024.07.22 05:01:00
avatar: true
---

## HKS > Cluster NodePool 관련 운영
:::
- 기존 50개, 수정 시 기존 + 50개 가 되어야함
:::

클러스터 신규 생성 또는 노드풀 추가시 한번에 만들수 있는 노드개수를 50개로 제한 (why. 한번에 너무 많은 노드를 만들경우 오류 발생)
 클러스터 수정시 현재 가지고있는 모든 노드풀의 count 값 합산 + 50 으로 제한으로 밸리데이션 체크

```js{4}
export default {
{
    id: 'np_05_totalNode',
    code: useDirective(() => {
      const totalNodeCount = (rkeVersion.value === 'RKE2' ? tableRke2Node : tableRke1Node).items.reduce(
        (acc, cur) => acc + parseInt(cur.count),
        0
      )
      if (currentRoute.value.params.mode === 'create') {
        return totalNodeCount <= 50
      } else {
        const prevNodepoolCount = (rkeVersion.value === 'RKE2' ? savedNodepools.value : nodepools.value).reduce(
          (acc, cur) => acc + parseInt(cur.quantity),
          0
        )
        return totalNodeCount - prevNodepoolCount <= 50
      }
    }),
    message: t('hks_validate_total_node'),
  }
}
  ```
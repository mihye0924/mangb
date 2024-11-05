---
author: 조미혜
title: SonarQube 작동방법
thumbnail: thumbnail.png
refer: https://github.com/DFY-CODE/hcloud/issues/1029
tags: [HCloud, Vue, SonarQube]
layout: article
sidebar: false
created: 2024.11.05 06:00:00
avatar: true
---

## 테스트방법
------------------------------------------------
환경 설정을 간소화 하기 위해 Docker를 사용합니다.
또한 다음 방법이 절대적인 것은 아니지만, 그대로 따라했을 때 동작하는 것을 목적으로 하기에 제가 수행한 방식을 그대로 작성하는 점 참고 부탁드립니다.

1. Docker Desktop을 설치합니다.
2. docker.com에 개인 회원으로 가입합니다.
3. Docker Desktop을 실행합니다(로그인 필요).
4. 터미널에서 다음 명령어를 실행합니다.
```
docker run -d --name sonarqube -p 9000:9000 sonarqube:9.9.3-community
# 9.9.3-community은 현재 현대자동차에서 사용하는 소나큐브 버전
```


5. 브라우저에서 http://localhost:9000으로 접속합니다.
- ID: admin
- PW: admin


6. 프로젝트를 생성합니다.
- Manually를 선택합니다.
- Project display name, Project key, Main branch name를 작성합니다.
  - Project key는 7번 과정에서 다시 사용하게 됩니다.
  - Main branch name는 검사를 수행할 브랜치명을 입력합니다.
- Set Up 버튼을 클릭하고 다음 단계에서 Locally를 선택합니다.
- Generate 버튼을 클릭하여 토큰을 얻습니다.
    - 이 토큰은 7번 과정에서 다시 사용하게 되며, (아마도)이후에 다시 확인할 수 없기에 따로 저장해 놓아야 합니다.
    - 여기까지 진행했다면 프로젝트 생성은 완료되었습니다.


7. 프로젝트 루트에 sonarqube.sh 파일을 생성하고, 다음과 같이 작성합니다.

```
#!/bin/bash
token="{6번_과정에서_얻은_토큰}" # e.g., "sqp_0e64da6073f70aacc137e9f5fa18f30f33a9cc96"
url="http://127.0.0.1:9000"
projectKey="{6번_과정에서_기입한_프로젝트_키}" # e.g., "hcloud"
sources="{프로젝트의_절대경로}" # e.g., "/Users/cjkim/Project/hcloud"
exclusions="**/node_modules/**,**/dist/**,**/coverage/**,**/*.spec.js,**/*.test.js,**/build/**,**/.*"


docker run \
  --rm \
  --net host \
  -e SONAR_HOST_URL=$url \
  -v ${PWD}:/usr/src \
  sonarsource/sonar-scanner-cli \
  --debug \
  -Dsonar.projectKey=$projectKey \
  -Dsonar.sonar.sourceEncoding=UTF-8 \
  -Dsonar.sonar.host.url=$url \
  -Dsonar.sources=/usr/src \
  -Dsonar.login=$token \
  -Dsonar.exclusions=$exclusions
```


8. 7번에서 생성한 파일의 권한을 다음과 같이 변경합니다(터미널에서 프로젝트 루트 경로로 이동 후 실행).

```
chmod +x sonarqube.sh
```


9. 다음과 같이 소나큐브를 실행합니다(터미널에서 프로젝트 루트 경로로 이동 후 실행, 몇십분 소요됨).
```
./sonarqube.sh
```

10. 검사가 종료되면 결과는 5번과 동일하게 http://localhost:9000에서 확인할 수 있습니다.

----------------------------------------------------------------

#### 조치 내용
이전에는 XSS와 DoS 항목에 대해서 융통성을 발휘하여 별다른 조치없이 넘어갔으나, 이번에는 조치를 해달라는 요구가 있었습니다.

----------------------------------------------------------------

#### XSS
:href, v-html에서 발생하고 있었습니다.

----------------------------------------------------------------


#### :href
김봉찬 책임님은 "함수로 빼서 URL 유효성 검사하면" 거의 다 해결될 것 같다고 했으나, 그런 일은 없었습니다.
:href="util.sanitizeUrl(link)" 이런 식으로 util.sanitizeUrl 함수를 사용해도 SonarQube에서는 :href 사용 여부로 체크하기에 동일하게 문제로 지적합니다.
그래서 약간의 편법으로 다음과 같이 우회했습니다: v-bind="{ href: util.sanitizeUrl(link) }"

>유효하지 않은 URL은 사용될 수 없도록 utils/util.js에 sanitizeUrl 함수를 추가하고 이를 사용했습니다.

----------------------------------------------------------------


#### :v-html
vue-dompurify-html 패키지를 설치했고, v-html을 v-dompurify-html으로 교체했습니다.


----------------------------------------------------------------


#### DoS
정규식의 백트래킹으로 인한 성능 저하와 관련된 지적입니다.

node-re2를 사용하려고 했으나 코드의 수정이 많이 필요하다는 단점이 있었고, 정확하게는 모르겠지만 이름에 node가 붙은 것으로 봐서 서버단에서만 동작하는 것이 아닌가 싶어서 사용하지 않았습니다.

대안으로 re2js 패키지를 설치/사용했고, 문제가 되는 정규식에 대해서만 RE2JS를 적용했습니다.
---
author: 조미혜
title: 애니메이션 플러그인
thumbnail: thumbnail.png
refer: 
tags: [matter.js]
layout: article
sidebar: false
created: 2024.08.02 10:40:00
avatar: true
---


## 애니메이션 플러그인 모음집
#### 1. Matter.js
링크 : https://brm.io/matter-js/


#### 2. Scradar.js
링크 : https://gist.github.com/Kim-Chuljoong/381e911942e18eee4f5dc3851810a78b
사용법 : 
```html  
  <div id="anchorBoxId_{$product_no}" class="cont-box scradar" data-scradar="{progressVisible: true, visibleStep:[0.25]}">
    <div class="inner">
      <div class="txt-box">
        <div class="main-txt">
          <p >Originality shapes</p>
          <p >one people</p>
        </div>
      </div>
      <div class="img-box"> 
        <div class="cursor-pointer">  
          <div class="cursor-a">
            <span >{$product_name}</span>
            <i class="icon-arrow_6" />
          </div> 
        </div>
        <a href="/product/detail.html{$param}"> 
          <img src="/assets/main/main-section02-1.png" alt="R02-LC" />
        </a>
      </div>
    </div> 
  </div>  
```
```css  
  #scroll-two .cont-box[data-visible-step='1'] .inner {
    opacity: 1;
    transform: translateY(0);
  }   
```
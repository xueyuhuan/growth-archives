<template>
    <div class="index">
        <el-card shadow="hover">成长圈</el-card>
        <div class="content">
            <el-card class="left">
                <ul class="list">
                    <li>
                        <div class="user">
                            <img src="../assets/img/demo1.png"/>
                            <p>
                                <strong>同学a</strong><br/>
                                <span>三年级2班</span><br/>
                                <time>35分钟前</time>
                            </p>
                        </div>
                        <div class="text">
                            <p>校级绘画比赛一等奖的活动。</p>
                            <img src="../assets/img/demo1.png"/>
                        </div>
                    </li>
                    <li>
                        <div class="user">
                            <img src="../assets/img/demo1.png"/>
                            <p>
                                <strong>同学a</strong><br/>
                                <span>三年级2班</span><br/>
                                <time>35分钟前</time>
                            </p>
                        </div>
                        <div class="text">
                            <p>校级绘画比赛一等奖的活动。</p>
                        </div>
                    </li>
                </ul>
                <el-pagination background
                        layout="prev, pager, next"
                        :total="50">
                </el-pagination>
            </el-card>
            <div class="right">
                <el-card>
                    <div class="user">
                        <img src="../assets/img/demo1.png"/>
                        <p>
                            <strong>同学a</strong><br/>
                            <span>三年级2班</span><br/>
                            <time>35分钟前</time>
                        </p>
                    </div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Index"
  }
</script>

<style lang="scss">
    .index{
        @extend %width;
        .content{
            @include flex(space-between,flex-start);
            .left{
                
            }
        }
        ul.list{
            margin-bottom: 20px;
            li{
                padding: 20px 0;
                border-bottom: 1px solid #e0e0e0;
                .user{
                    @include flex;
                    img{
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        margin-right: 15px;
                    }
                    p{
                        line-height: 2;
                        font-size: 12px;
                        color: #666;
                        margin: 0;
                        &.name{
                            font-weight: bold;
                        }
                    }
                }
                .text{
                    font-size: 14px;
                    p{
                        margin: 14px 0 0 0;
                    }
                    img{
                        margin: 14px 0 0 0;
                    }
                }
            }
            &:first-child{
                padding-top: 0;
            }
            &:last-child{
                padding-bottom: 0;
            }
        }

    }
</style>
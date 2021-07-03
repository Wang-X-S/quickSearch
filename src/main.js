const $siteList = $('.siteList')
const $addWeb = $('.addWeb')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject|| [
    { logo:'aliyun', logoType:'svgSelf',url:'https://www.aliyun.com/'},
    { logo:'bilibili', logoType:'svgSelf',url:'https://www.bilibili.com/'},
    { logo:'cndblogs', logoType:'svgSelf',url:'https://www.cnblogs.com/'},
    { logo:'GitHub', logoType:'svgSelf',url:'https://github.com/'},
    { logo:'Stackoverflow', logoType:'svgSelf',url:'https://stackoverflow.com/'},
    { logo:'Leetcode', logoType:'svgSelf',url:'https://leetcode-cn.com/'},
    { logo:'zhihu', logoType:'svgSelf',url:'https://www.zhihu.com/'},
]

const simplifyUrl = (url)=>{
    return url.replace('http://','')
    .replace('https://','')
    .replace('www.','')
    .replace(/\/.*/, '') // 删除 / 开头的内容
    .replace('.com','')
    .replace('.cn','')
}

const render =()=>{hashMap.forEach(node=>{
    if(node.logoType==='svgSelf'){
        $(`
            <li>
                <a href="${node.url}">
                    <div class="site">
                        <div class="logo">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-${(node.logo).toLowerCase()}"></use>
                            </svg>
                        </div>
                        <dig class="link">${node.logo}</dig>
                    </div>
                </a>
            </li>
    `).insertBefore($addWeb)
    }else{
        $(`
            <li>
                <a href="${node.url}">
                    <div class="site">
                        <div class="logo">
                            ${simplifyUrl(node.url)[0].toUpperCase()}
                        </div>
                        <dig class="link">${simplifyUrl(node.url)}</dig>
                    </div>
                </a>
            </li>
    `).insertBefore($addWeb)
    }
})
}
render()
$('.addButton').on('click', () => {
    $siteList.find('li:not(.addWeb)').remove()
    console.log('123')
    let url = window.prompt(
        '请输入你要添加的网址'
    )

    if (url.indexOf('http') !== 0) {
        url = 'https://' + url
    }
    console.log(url)

    hashMap.push({
        logo: url[0],
        logoType:'text',
        url:url
    })

    render()
    // const $li = $(`
    //           <li>       
    //               <a href="${url}">
    //                 <div class="site">
    //                     <div class="logo">
    //                         ${url[0]}
    //                     </div>
    //                     <dig class="link">${url}</dig>
    //                 </div>     
    //              </a>
    //          </li>`).insertBefore('.addWeb')
})
window.onbeforeunload =()=>{
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x',string)
}
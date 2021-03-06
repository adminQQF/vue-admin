
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  },
  visitor: {
    token: 'visitor-token'
  }
}

const users = {
  'admin-token': {
    permissionRoutesMap: [
      {
        'menuName': 'permissionTest',
        'menuId': '1',
        'menuType': 'M', // M: 根目录; C: 子目录; F: 按钮权限
        'children': [
          {
            'menuName': 'menu1',
            'menuId': '1_1',
            'menuType': 'C',
            'children': [
              {
                'menuName': 'menu1-1',
                'menuId': '1_1_1',
                'menuType': 'C',
                'children': []
              },
              {
                'menuName': 'menu1-2',
                'menuId': '1_1_2',
                'menuType': 'C',
                'children': [
                  {
                    'menuName': 'menu1-1-2-1',
                    'menuId': '1_1_2_1',
                    'menuType': 'C',
                    'children': []
                  },
                  {
                    'menuName': 'menu1-1-2-2',
                    'menuId': '1_1_2_2',
                    'menuType': 'C',
                    'children': []
                  }
                ]
              },
              {
                'menuName': 'menu1-3',
                'menuId': '1_1_3',
                'menuType': 'C',
                'children': []
              }
            ]
          },
          {
            'menuName': 'menu2',
            'menuId': '1_2',
            'menuType': 'C',
            'children': [
              {
                'menuName': '新增',
                'menuId': '1_2_01',
                'menuType': 'F',
                'children': []
              },
              {
                'menuName': '删除',
                'menuId': '1_2_02',
                'menuType': 'F',
                'children': []
              }
            ]
          }
        ]
      },
      {
        'menuName': 'test',
        'menuId': '2',
        'menuType': 'M',
        'children': []
      }
    ],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    permissionRoutesMap: [
      {
        'menuName': 'permissionTest',
        'menuId': '1',
        'menuType': 'M',
        'children': [
          {
            'menuName': 'menu2',
            'menuId': '1_2',
            'menuType': 'C',
            'children': [
              {
                'menuName': '新增',
                'menuId': '1_2_01',
                'menuType': 'F',
                'children': []
              }
            ]
          }
        ]
      }
    ],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  'visitor-token': {
    permissionRoutesMap: [],
    introduction: 'I am an visitor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'visitor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      const { username, password } = config.body

      // 用户校验，规则自定义
      const token = tokens[username]
      if (token) {
        if (password.length) {
          return { // 登陆成功
            code: 20000,
            message: '登陆成功',
            data: token
          }
        } else {
          return {
            code: 60203,
            message: '密码错误'
          }
        }
      } else {
        return {
          code: 60204,
          message: '不存在此用户'
        }
      }
    }
  },

  // get user info
  {
    url: '/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

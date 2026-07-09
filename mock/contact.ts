import type { MockMethod } from 'vite-plugin-mock'

/** 联系人 mock 数据 */
const allContacts = [
  { id: 1, avatar: '', fullName: 'Angela Moss', position: 'Marketing Manager', company: 'Highspeed Studios', phone: '+12 345 6789 0', email: 'angelamoss@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 2, avatar: '', fullName: 'Ahmad Zayn', position: 'Photographer', company: 'Audio Video Teams', phone: '+12 345 6789 1', email: 'ahmadzayn@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 3, avatar: '', fullName: 'Brian Connor', position: 'Designer', company: 'Crimzon Guards Studios', phone: '+12 345 6789 2', email: 'brianconnor@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 4, avatar: '', fullName: 'Courtney Hawkins', position: 'Programmer', company: 'Highspeed Studios', phone: '+12 345 6789 3', email: 'courtneyhawk@mail.com', teamColor: '' , teamCode: 'Hs' },
  { id: 5, avatar: '', fullName: 'Chyntia Smilee', position: 'Marketing Manager', company: 'Crimzon Guards Studios', phone: '+12 345 6789 4', email: 'chyntiasmilee@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 6, avatar: '', fullName: 'David Here', position: 'Developer', company: 'Highspeed Studios', phone: '+12 345 6789 5', email: 'davidhere@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 7, avatar: '', fullName: 'Dennise Lee', position: 'Product Manager', company: 'Audio Video Teams', phone: '+12 345 6789 6', email: 'denisselee@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 8, avatar: '', fullName: 'Erbatov Axie', position: 'Designer', company: 'Crimzon Guards Studios', phone: '+12 345 6789 7', email: 'erbatovaxie@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 9, avatar: '', fullName: 'Evan Khan', position: 'Developer', company: 'Highspeed Studios', phone: '+12 345 6789 8', email: 'evankhan@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 10, avatar: '', fullName: 'Fanny Humble', position: 'Marketing Manager', company: 'Audio Video Teams', phone: '+12 345 6789 9', email: 'fannyhumble@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 11, avatar: '', fullName: 'Franklin Jr.', position: 'Photographer', company: 'Highspeed Studios', phone: '+12 345 6789 10', email: 'franklinjr@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 12, avatar: '', fullName: 'Gandalf Hoos', position: 'Designer', company: 'Crimzon Guards Studios', phone: '+12 345 6789 11', email: 'gandalfhoss@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 13, avatar: '', fullName: 'Gabriella', position: 'Product Manager', company: 'Audio Video Teams', phone: '+12 345 6789 12', email: 'gabriella@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 14, avatar: '', fullName: 'Hanny Shella', position: 'Developer', company: 'Highspeed Studios', phone: '+12 345 6789 13', email: 'hannyshella@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 15, avatar: '', fullName: 'Ivankov', position: 'Marketing Manager', company: 'Crimzon Guards Studios', phone: '+12 345 6789 14', email: 'ivankov123@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 16, avatar: '', fullName: 'Alice Wong', position: 'Designer', company: 'Highspeed Studios', phone: '+12 345 6789 15', email: 'alicewong@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 17, avatar: '', fullName: 'Bob Chen', position: 'Developer', company: 'Audio Video Teams', phone: '+12 345 6789 16', email: 'bobchen@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 18, avatar: '', fullName: 'Carla Stone', position: 'Photographer', company: 'Crimzon Guards Studios', phone: '+12 345 6789 17', email: 'carlastone@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 19, avatar: '', fullName: 'Daniel Park', position: 'Product Manager', company: 'Highspeed Studios', phone: '+12 345 6789 18', email: 'danielpark@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 20, avatar: '', fullName: 'Emma Lee', position: 'Marketing Manager', company: 'Audio Video Teams', phone: '+12 345 6789 19', email: 'emmalee@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 21, avatar: '', fullName: 'Felix Tan', position: 'Designer', company: 'Crimzon Guards Studios', phone: '+12 345 6789 20', email: 'felixtan@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 22, avatar: '', fullName: 'Grace Kim', position: 'Developer', company: 'Highspeed Studios', phone: '+12 345 6789 21', email: 'gracekim@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 23, avatar: '', fullName: 'Henry Wu', position: 'Photographer', company: 'Audio Video Teams', phone: '+12 345 6789 22', email: 'henrywu@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 24, avatar: '', fullName: 'Iris Zhao', position: 'Product Manager', company: 'Crimzon Guards Studios', phone: '+12 345 6789 23', email: 'iriszhao@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 25, avatar: '', fullName: 'Jack Sun', position: 'Marketing Manager', company: 'Highspeed Studios', phone: '+12 345 6789 24', email: 'jacksun@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 26, avatar: '', fullName: 'Kate Liu', position: 'Designer', company: 'Audio Video Teams', phone: '+12 345 6789 25', email: 'kateliu@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 27, avatar: '', fullName: 'Leo Zhang', position: 'Developer', company: 'Crimzon Guards Studios', phone: '+12 345 6789 26', email: 'leozhang@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 28, avatar: '', fullName: 'Mia Yang', position: 'Photographer', company: 'Highspeed Studios', phone: '+12 345 6789 27', email: 'miayang@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 29, avatar: '', fullName: 'Noah Lin', position: 'Product Manager', company: 'Audio Video Teams', phone: '+12 345 6789 28', email: 'noahlin@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 30, avatar: '', fullName: 'Olivia Hu', position: 'Marketing Manager', company: 'Crimzon Guards Studios', phone: '+12 345 6789 29', email: 'oliviahu@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 31, avatar: '', fullName: 'Peter Ma', position: 'Designer', company: 'Highspeed Studios', phone: '+12 345 6789 30', email: 'peterma@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 32, avatar: '', fullName: 'Quinn Gao', position: 'Developer', company: 'Audio Video Teams', phone: '+12 345 6789 31', email: 'quingao@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 33, avatar: '', fullName: 'Ruby Xin', position: 'Photographer', company: 'Crimzon Guards Studios', phone: '+12 345 6789 32', email: 'rubyxin@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 34, avatar: '', fullName: 'Sam Tang', position: 'Product Manager', company: 'Highspeed Studios', phone: '+12 345 6789 33', email: 'samtang@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 35, avatar: '', fullName: 'Tina Lu', position: 'Marketing Manager', company: 'Audio Video Teams', phone: '+12 345 6789 34', email: 'tinalu@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 36, avatar: '', fullName: 'Victor He', position: 'Designer', company: 'Crimzon Guards Studios', phone: '+12 345 6789 35', email: 'victorhe@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 37, avatar: '', fullName: 'Wendy Cao', position: 'Developer', company: 'Highspeed Studios', phone: '+12 345 6789 36', email: 'wendycao@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 38, avatar: '', fullName: 'Xavier Mo', position: 'Photographer', company: 'Audio Video Teams', phone: '+12 345 6789 37', email: 'xaviermo@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 39, avatar: '', fullName: 'Yara Ding', position: 'Product Manager', company: 'Crimzon Guards Studios', phone: '+12 345 6789 38', email: 'yarading@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 40, avatar: '', fullName: 'Zack Fu', position: 'Marketing Manager', company: 'Highspeed Studios', phone: '+12 345 6789 39', email: 'zackfu@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 41, avatar: '', fullName: 'Amy Bai', position: 'Designer', company: 'Audio Video Teams', phone: '+12 345 6789 40', email: 'amybai@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 42, avatar: '', fullName: 'Ben Gong', position: 'Developer', company: 'Crimzon Guards Studios', phone: '+12 345 6789 41', email: 'bengong@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 43, avatar: '', fullName: 'Cara Pan', position: 'Photographer', company: 'Highspeed Studios', phone: '+12 345 6789 42', email: 'carapan@mail.com', teamCode: 'Hs', teamColor: '' },
  { id: 44, avatar: '', fullName: 'Dan Qin', position: 'Product Manager', company: 'Audio Video Teams', phone: '+12 345 6789 43', email: 'danqin@mail.com', teamCode: 'Av', teamColor: '' },
  { id: 45, avatar: '', fullName: 'Eve Ren', position: 'Marketing Manager', company: 'Crimzon Guards Studios', phone: '+12 345 6789 44', email: 'everen@mail.com', teamCode: 'Cz', teamColor: '' },
  { id: 46, avatar: '', fullName: 'Frank Shi', position: 'Designer', company: 'Highspeed Studios', phone: '+12 345 6789 45', email: 'frankshi@mail.com', teamCode: 'Hs', teamColor: '' },
]

export default [
  {
    url: '/api/list',
    method: 'get',
    response: ({ query }) => {
      const page = Number(query.page) || 1
      const pageSize = Number(query.pageSize) || 10
      const keyword = (query.keyword || '').trim().toLowerCase()

      // 关键词过滤：模糊匹配姓名 / 邮箱 / 公司 / 职位
      let filtered = allContacts
      if (keyword) {
        filtered = allContacts.filter(
          (c) =>
            c.fullName.toLowerCase().includes(keyword) ||
            c.email.toLowerCase().includes(keyword) ||
            c.company.toLowerCase().includes(keyword) ||
            c.position.toLowerCase().includes(keyword)
        )
      }

      const total = filtered.length
      const totalPages = Math.ceil(total / pageSize)
      const start = (page - 1) * pageSize
      const list = filtered.slice(start, start + pageSize)

      return {
        code: 0,
        msg: 'success',
        data: {
          pagination: {
            currentPage: page,
            pageSize,
            total,
            totalPages,
          },
          list,
        },
      }
    },
  },
] as MockMethod[]

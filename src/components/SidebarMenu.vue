<template>
  <ul class="sidebar-menu">
    <li class="header">Users</li>
    <li class="treeview">
      <a>
        <i class="fa fa-user-o"></i>
        <span>用户管理</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a>
          <router-link tag="li" class="pageLink" to="/users">
            <i class="fa fa-user-o"></i> 用户信息
          </router-link>
          </a>
        </li>
      </ul>
    </li>



    <li class="header">WangXuAdd</li>
    <li class="treeview">
      <a>
        <i class="fa fa-folder-o"></i>
        <span>OS</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>

          <a>
            <router-link tag="li" class="pageLink" to="/ostables">
            <i class="fa fa-tasks"></i> 操作系统
            </router-link>
          </a>

        </li>
        <li>
          <a>
            <router-link tag="li" class="pageLink" to="/servertables">
              <i class="fa fa-file-picture-o"></i> 服务器
            </router-link>
          </a>
        </li>
        <li>
        <a>
          <router-link tag="li" class="pageLink" to="/">
            <i class="fa fa-file-picture-o"></i> table2
          </router-link>
        </a>
      </li>
      </ul>
    </li>

    <li class="header">TOOLS</li>
    <router-link tag="li" class="pageLink" to="/">
      <a>
        <i class="fa fa-desktop"></i>
        <span class="page">Dashboard</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/tables">
      <a>
        <i class="fa fa-table"></i>
        <span class="page">Tables</span>
      </a>
    </router-link>

    <li class="header">ME</li>
    <router-link tag="li" class="pageLink" to="/tasks">
      <a>
        <i class="fa fa-tasks"></i>
        <span class="page">Tasks</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/setting">
      <a>
        <i class="fa fa-cog"></i>
        <span class="page">Settings</span>
      </a>
    </router-link>
    <li class="treeview">
      <a href="#">
        <i class="fa fa-folder-o"></i>
        <span>Files</span>
        <span class="pull-right-container">
          <i class="fa fa-angle-left fa-fw pull-right"></i>
        </span>
      </a>
      <ul class="treeview-menu">
        <li>
          <a href="#">
            <i class="fa fa-file-word-o"></i> Item 1
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-picture-o"></i> Item 2
          </a>
        </li>
        <li>
          <a href="#">
            <i class="fa fa-file-pdf-o"></i> Item 3
          </a>
        </li>
      </ul>
    </li>

    <li class="header">LOGS</li>
    <router-link tag="li" class="pageLink" to="/access">
      <a>
        <i class="fa fa-book"></i>
        <span class="page">Access</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/server">
      <a>
        <i class="fa fa-hdd-o"></i>
        <span class="page">Server</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/repos">
      <a>
        <i class="fa fa-heart"></i>
        <span class="page">Repos</span>
        <small class="label pull-right bg-green">AJAX</small>
      </a>
    </router-link>

    <li class="header">PAGES</li>
    <router-link tag="li" class="pageLink" to="/login">
      <a>
        <i class="fa fa-circle-o text-yellow"></i>
        <span class="page"> Login</span>
      </a>
    </router-link>
    <router-link tag="li" class="pageLink" to="/404">
      <a>
        <i class="fa fa-circle-o text-red"></i>
        <span class="page"> 404</span>
      </a>
    </router-link>
  </ul>
</template>
<script>
export default {
  name: 'SidebarMenu',
  mounted(){

  }
}
</script>
<style>
  /* override default */
  .sidebar-menu>li>a {
    padding: 12px 15px 12px 15px;
  }

  .sidebar-menu li.active>a>.fa-angle-left,
  .sidebar-menu li.active>a>.pull-right-container>.fa-angle-left{
    animation-name: rotateIcon;
    animation-duration: .5s;
    animation-fill-mode: forwards;
  }

  @keyframes rotateIcon {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(-90deg);
    }
  }
  .pageLink{
    height: 37px;
    padding: 10px;

  }
</style>

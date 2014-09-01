from django.conf.urls import patterns,url
from emp.views import Department_List,Employee_List
from emp import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import renderers
dep_list = Department_List.as_view({
    'get': 'list',
    'post': 'create'
},)
dep_detail = Department_List.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
emp_list = Employee_List.as_view({
    'get': 'list',
    'post': 'create'
},)
emp_detail = Employee_List.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})
urlpatterns=patterns('',url(r'^$',views.IndexView.as_view(), name="index"),
                        url(r'^list/$', views.List.as_view(), name="List"),
                        url(r'^list1/$',views.List1.as_view(),name="List1"),
                        url(r'^department/$',dep_list,name='department'),
                        url(r'^department/(?P<pk>[0-9]+)/$',dep_detail,name='department1'),
                        url(r'^employee/$',emp_list,name='employee'),
                        url(r'^employee/(?P<pk>[0-9]+)/$',emp_detail,name='employee1'),
                     )
#urlpatterns = format_suffix_patterns(urlpatterns)

